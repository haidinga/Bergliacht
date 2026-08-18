/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";
import { formatPrice } from "../utils/currency.js";


/* ==========================================================
   Constants
========================================================== */

const FAVORITES_KEY = "bergliachtFavorites";
const CART_KEY = "bergliachtCart";


/* ==========================================================
   Storage
========================================================== */

function getFavorites() {

    try {

        const favorites = JSON.parse(
            localStorage.getItem(FAVORITES_KEY)
        );

        return Array.isArray(favorites) ? favorites : [];

    } catch (error) {

        return [];

    }

}

function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}

export function isProductFavorite(productId) {

    return getFavorites().includes(productId);

}


/* ==========================================================
   Favorites
========================================================== */

export function renderFavorites(products = [], colors = []) {

    const trigger = document.querySelector(
        "[data-favorites-trigger]"
    );

    if (!trigger) return;

    document.querySelector(".favorites-drawer-overlay")?.remove();

    const activeProducts = products.filter(product => product.active);
    const activeColors = colors.filter(color => color.active);
    const colorMap = new Map(
        activeColors.map(color => [color.id, color])
    );

    const overlay = document.createElement("div");

    overlay.className = "favorites-drawer-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
        <aside
            class="favorites-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorites-drawer-title"
        >
            <div class="favorites-drawer__header">
                <div>
                    <p class="favorites-drawer__eyebrow">Deine Auswahl</p>
                    <h2 id="favorites-drawer-title">Favoriten</h2>
                </div>

                <button
                    class="favorites-drawer__close"
                    type="button"
                    aria-label="Favoriten schließen"
                >
                    ${createIcon("x")}
                </button>
            </div>

            <div class="favorites-drawer__body"></div>
        </aside>
    `;

    document.body.append(overlay);

    const body = overlay.querySelector(".favorites-drawer__body");
    const closeButton = overlay.querySelector(".favorites-drawer__close");

    const createFavoriteItem = product => {

        const image =
            `${product.media.folder}${product.media.thumbnail}`;

        const variantOptions = product.variants.map(variant => `
            <option value="${variant.id}">
                ${variant.label} · ${formatPrice(variant.price)}
            </option>
        `).join("");

        const colorOptions = product.colors
            .map(colorId => colorMap.get(colorId))
            .filter(Boolean)
            .map(color => `
                <option value="${color.id}">
                    ${color.content.name}
                </option>
            `).join("");

        return `
            <article
                class="favorite-item"
                data-favorite-item="${product.id}"
            >
                <a
                    class="favorite-item__media"
                    href="product.html?id=${product.id}"
                >
                    <img src="${image}" alt="${product.content.name}">
                </a>

                <div class="favorite-item__content">
                    <div class="favorite-item__top">
                        <a href="product.html?id=${product.id}">
                            <h3>${product.content.name}</h3>
                        </a>

                        <button
                            class="favorite-button favorite-item__remove is-favorite"
                            type="button"
                            data-favorite-button
                            data-product-id="${product.id}"
                            aria-label="${product.content.name} aus Favoriten entfernen"
                            aria-pressed="true"
                        >
                            ${createIcon("heart-filled")}
                        </button>
                    </div>

                    <div class="favorite-item__options">
                        <label>
                            <span>Größe</span>
                            <select data-favorite-variant>
                                <option value="">Auswählen</option>
                                ${variantOptions}
                            </select>
                        </label>

                        <label>
                            <span>Farbe</span>
                            <select data-favorite-color>
                                <option value="">Auswählen</option>
                                ${colorOptions}
                            </select>
                        </label>
                    </div>

                    <button
                        class="favorite-item__cart"
                        type="button"
                        data-favorite-add-to-cart="${product.id}"
                    >
                        In den Warenkorb
                    </button>
                </div>
            </article>
        `;

    };

    const updateButtons = favorites => {

        document.querySelectorAll("[data-favorite-button]")
            .forEach(button => {

                const isFavorite = favorites.includes(
                    button.dataset.productId
                );

                button.classList.toggle("is-favorite", isFavorite);
                button.setAttribute("aria-pressed", String(isFavorite));

                const icon = button.querySelector(".icon");

                if (icon) {
                    icon.src = `./assets/icons/${
                        isFavorite ? "heart-filled" : "heart"
                    }.svg`;
                }

            });

        const counter = trigger.querySelector(
            ".header__favorite-count"
        );

        trigger.classList.toggle(
            "is-favorite",
            favorites.length > 0
        );

        const triggerIcon = trigger.querySelector(".icon");

        if (triggerIcon) {
            triggerIcon.src = `./assets/icons/${
                favorites.length ? "heart-filled" : "heart"
            }.svg`;
        }

        if (counter) {
            counter.textContent = favorites.length;
            counter.style.display = favorites.length ? "flex" : "none";
        }

    };

    const renderDrawer = () => {

        const favorites = getFavorites();
        const favoriteProducts = favorites
            .map(id => activeProducts.find(product => product.id === id))
            .filter(Boolean);

        body.innerHTML = favoriteProducts.length
            ? `<div class="favorites-drawer__list">
                ${favoriteProducts.map(createFavoriteItem).join("")}
            </div>`
            : `<div class="favorites-drawer__empty">
                ${createIcon("heart")}
                <h3>Noch keine Favoriten</h3>
                <p>
                    Tippe bei einem Produkt auf das Herz, um es hier zu speichern.
                </p>
            </div>`;

        updateButtons(favorites);

    };

    const toggleFavorite = (productId, button) => {

        const favorites = getFavorites();
        const isFavorite = favorites.includes(productId);
        const updatedFavorites = isFavorite
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];

        saveFavorites(updatedFavorites);
        updateButtons(updatedFavorites);

        if (!isFavorite && button) {
            button.classList.add("is-beating");
            window.setTimeout(
                () => button.classList.remove("is-beating"),
                650
            );
        }

        if (overlay.classList.contains("is-open")) {
            renderDrawer();
        }

    };

    const addToCart = (productId, item, button) => {

        const product = activeProducts.find(
            currentProduct => currentProduct.id === productId
        );

        if (!product) return;

        const variantSelect = item.querySelector("[data-favorite-variant]");
        const colorSelect = item.querySelector("[data-favorite-color]");

        const variant = product.variants.find(
            currentVariant => currentVariant.id === variantSelect.value
        );

        const color = colorMap.get(colorSelect.value);

        variantSelect.classList.toggle("has-error", !variant);
        colorSelect.classList.toggle("has-error", !color);

        if (!variant || !color) {
            item.classList.remove("is-shaking");
            void item.offsetWidth;
            item.classList.add("is-shaking");
            window.setTimeout(
                () => item.classList.remove("is-shaking"),
                500
            );
            return;
        }

        let cart = [];

        try {
            cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (error) {
            cart = [];
        }

        const existingItem = cart.find(cartItem =>
            cartItem.productId === product.id &&
            cartItem.variantId === variant.id &&
            cartItem.colorId === color.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: product.id,
                variantId: variant.id,
                variantLabel: variant.label ?? variant.id,
                price: Number(variant.price),
                colorId: color.id,
                colorName: color.content.name,
                quantity: 1
            });
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        document.dispatchEvent(new CustomEvent("addToCart", {
            detail: {
                productId: product.id,
                variantId: variant.id,
                colorId: color.id,
                quantity: 1
            }
        }));

        const originalText = button.textContent;
        button.textContent = "Hinzugefügt ✓";
        button.disabled = true;

        window.setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1400);

    };

    const open = () => {
        renderDrawer();
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("favorites-is-open");
        window.setTimeout(() => closeButton.focus(), 250);
    };

    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("favorites-is-open");
        trigger.focus();
    };

    trigger.addEventListener("click", open);
    closeButton.addEventListener("click", close);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) close();
    });

    document.addEventListener("click", event => {

        const favoriteButton = event.target.closest(
            "[data-favorite-button]"
        );

        if (favoriteButton) {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(
                favoriteButton.dataset.productId,
                favoriteButton
            );
            return;
        }

        const cartButton = event.target.closest(
            "[data-favorite-add-to-cart]"
        );

        if (cartButton) {
            addToCart(
                cartButton.dataset.favoriteAddToCart,
                cartButton.closest(".favorite-item"),
                cartButton
            );
        }

    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            close();
        }
    });

    window.addEventListener("storage", event => {
        if (event.key === FAVORITES_KEY) {
            updateButtons(getFavorites());
            if (overlay.classList.contains("is-open")) renderDrawer();
        }
    });

    updateButtons(getFavorites());

}
