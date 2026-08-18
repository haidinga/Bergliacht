/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";
import { formatPrice } from "../utils/currency.js";
import { isProductFavorite } from "./favorites.js";


/* ==========================================================
   Search Drawer
========================================================== */

export function renderSearchDrawer(products = []) {

    const trigger = document.querySelector(
        "[data-search-trigger]"
    );

    if (!trigger) return;

    document.querySelector(".search-drawer-overlay")?.remove();

    const activeProducts = products.filter(
        product => product.active
    );

    const overlay = document.createElement("div");

    overlay.className = "search-drawer-overlay";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
        <aside
            class="search-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-drawer-title"
        >
            <div class="search-drawer__header">
                <label
                    class="search-drawer__input-wrap"
                    for="site-search-input"
                >
                    ${createIcon("search")}

                    <span
                        id="search-drawer-title"
                        class="search-drawer__sr-only"
                    >
                        Produktsuche
                    </span>

                    <input
                        id="site-search-input"
                        class="search-drawer__input"
                        type="search"
                        placeholder="Wonach suchst du?"
                        autocomplete="off"
                    >
                </label>

                <button
                    class="search-drawer__close"
                    type="button"
                    aria-label="Suche schließen"
                >
                    ${createIcon("x")}
                </button>
            </div>

            <div class="search-drawer__body">
                <div class="search-drawer__suggestions">
                    <p class="search-drawer__heading">
                        Vielleicht suchst du …
                    </p>

                    <div class="search-drawer__terms">
                        <button type="button" data-search-term="Vase">Vasen</button>
                        <button type="button" data-search-term="essence">Essence</button>
                        <button type="button" data-search-term="forma">Forma</button>
                        <button type="button" data-search-term="terra">Terra</button>
                    </div>
                </div>

                <div
                    class="search-drawer__results"
                    aria-live="polite"
                ></div>
            </div>
        </aside>
    `;

    document.body.append(overlay);

    const drawer = overlay.querySelector(".search-drawer");
    const input = overlay.querySelector(".search-drawer__input");
    const closeButton = overlay.querySelector(".search-drawer__close");
    const results = overlay.querySelector(".search-drawer__results");
    const suggestions = overlay.querySelector(".search-drawer__suggestions");
    const termButtons = overlay.querySelectorAll("[data-search-term]");

    const normalize = value => String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const matchesSearch = (product, term) => {

        const searchableText = [
            product.content?.name,
            product.content?.subtitle,
            product.content?.shortDescription,
            product.classification?.category,
            product.classification?.collection,
            product.classification?.new ? "neu neuheiten" : ""
        ].join(" ");

        return normalize(searchableText).includes(term);

    };

    const createResult = product => {

        const image =
            `${product.media.folder}${product.media.thumbnail}`;

        const startingPrice = Math.min(
            ...product.variants.map(variant => Number(variant.price))
        );

        const isFavorite = isProductFavorite(product.id);

        return `
            <div class="search-result">
                <a
                    class="search-result__link"
                    href="product.html?id=${product.id}"
                >
                    <img
                        class="search-result__image"
                        src="${image}"
                        alt=""
                        loading="lazy"
                    >

                    <span class="search-result__content">
                        <strong>${product.content.name}</strong>
                        <span>ab ${formatPrice(startingPrice)}</span>
                    </span>
                </a>

                <button
                    class="favorite-button search-result__favorite ${
                        isFavorite ? "is-favorite" : ""
                    }"
                    type="button"
                    data-favorite-button
                    data-product-id="${product.id}"
                    aria-label="${product.content.name} ${
                        isFavorite
                            ? "aus Favoriten entfernen"
                            : "zu Favoriten hinzufügen"
                    }"
                    aria-pressed="${isFavorite}"
                >
                    ${createIcon(isFavorite ? "heart-filled" : "heart")}
                </button>
            </div>
        `;

    };

    const renderResults = () => {

        const term = normalize(input.value);

        suggestions.hidden = Boolean(term);

        const featuredProducts = activeProducts.filter(
            product => product.classification?.featured
        );

        const matchingProducts = term
            ? activeProducts.filter(product => matchesSearch(product, term))
            : (featuredProducts.length ? featuredProducts : activeProducts)
                .slice(0, 4);

        const heading = term
            ? `${matchingProducts.length} ${
                matchingProducts.length === 1 ? "Ergebnis" : "Ergebnisse"
            }`
            : "Ausgewählte Produkte";

        results.innerHTML = `
            <p class="search-drawer__heading">${heading}</p>

            ${matchingProducts.length
                ? `<div class="search-drawer__result-list">
                    ${matchingProducts.map(createResult).join("")}
                </div>`
                : `<p class="search-drawer__empty">
                    Leider wurde kein passendes Produkt gefunden.
                </p>`
            }
        `;

    };

    const open = () => {

        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("search-is-open");

        renderResults();

        window.setTimeout(() => input.focus(), 250);

    };

    const close = () => {

        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("search-is-open");
        trigger.focus();

    };

    trigger.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    input.addEventListener("input", renderResults);

    termButtons.forEach(button => {

        button.addEventListener("click", () => {

            input.value = button.dataset.searchTerm;
            renderResults();
            input.focus();

        });

    });

    overlay.addEventListener("click", event => {

        if (event.target === overlay) close();

    });

    drawer.addEventListener("click", event => {
        event.stopPropagation();
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            close();
        }

    });

}
