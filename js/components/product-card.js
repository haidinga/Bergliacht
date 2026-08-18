/* ==========================================================
   Imports
========================================================== */

import { formatPrice } from "../utils/currency.js";
import { createIcon } from "./icon.js";
import { isProductFavorite } from "./favorites.js";

/* ==========================================================
   Product Card
========================================================== */

export function createProductCard(product) {

    const startingPrice = Math.min(
        ...product.variants.map((variant) => variant.price)
    );

    const thumbnailImage =
        `${product.media.folder}${product.media.thumbnail}`;

    const previewColor = product.colors?.includes("anthrazit")
        ? "anthrazit"
        : product.colors?.[0];

    const colorImage = previewColor
        ? `${product.media.folder}${previewColor}.webp`
        : thumbnailImage;

    const sceneImage =
        `${product.media.folder}${product.media.scene}`;

    const badge = product.classification?.new
        ? "Neu"
        : product.classification?.bestseller
            ? "Best Seller"
            : product.classification?.featured
                ? "Featured"
                : "";

    const isFavorite = isProductFavorite(product.id);

    const images = [
        [thumbnailImage, `${product.content.name} – Produktansicht`],
        [colorImage, `${product.content.name} – ${previewColor ?? "Farbe"}`],
        [sceneImage, `${product.content.name} – Wohnszene`]
    ];

    return `
        <article class="product-card">
            <div class="product-card__media" data-product-card-gallery>
                <div class="product-card__slides">
                    ${images.map(([image, alt], index) => `
                        <a
                            class="product-card__slide"
                            href="product.html?id=${product.id}"
                            aria-label="${product.content.name} ansehen"
                            data-product-card-slide="${index}"
                        >
                            <img
                                class="product-card__image ${
                                    index === 1
                                        ? "product-card__image--color"
                                        : ""
                                }"
                                src="${image}"
                                data-fallback="${thumbnailImage}"
                                ${index === 1
                                    ? `data-product-card-color-image
                                       data-product-folder="${product.media.folder}"
                                       data-product-colors="${product.colors.join(",")}"
                                       data-current-color="${previewColor ?? ""}"`
                                    : ""
                                }
                                alt="${alt}"
                                loading="lazy"
                                onerror="this.onerror=()=>{this.onerror=null;this.src='./assets/images/placeholders/placeholder.svg'};this.src=this.dataset.fallback"
                            >
                        </a>
                    `).join("")}
                </div>

                ${badge ? `<span class="product-card__badge">${badge}</span>` : ""}

                <span
                    class="product-card__collection-mark"
                    aria-label="Kollektion-Symbol folgt"
                >
                    ${createIcon("star")}
                </span>

                <div class="product-card__dots" aria-label="Produktbilder">
                    ${[0, 1, 2].map(index => `
                        <button
                            class="product-card__dot ${index === 0 ? "is-active" : ""}"
                            type="button"
                            data-product-card-dot="${index}"
                            aria-label="Bild ${index + 1} anzeigen"
                            aria-current="${index === 0 ? "true" : "false"}"
                        ></button>
                    `).join("")}
                </div>
            </div>

            <div class="product-card__content">
                <div class="product-card__heading">
                    <a
                        class="product-card__link"
                        href="product.html?id=${product.id}"
                    >
                        <h3 class="product-card__title">
                            ${product.content.name}
                        </h3>
                    </a>

                    <button
                        class="product-card__favorite favorite-button ${
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

                <p class="product-card__description">
                    ${product.content.shortDescription}
                </p>

                <div class="product-card__footer">
                    <span class="product-card__price">
                        ab ${formatPrice(startingPrice)}
                    </span>

                    <a
                        class="product-card__cta"
                        href="product.html?id=${product.id}"
                    >
                        <span>Produkt ansehen</span>
                        ${createIcon("arrow-right")}
                    </a>
                </div>
            </div>
        </article>
    `;

}

export function initializeProductCards(root = document) {

    root.querySelectorAll("[data-product-card-gallery]")
        .forEach((gallery) => {

            if (gallery.dataset.initialized === "true") return;
            gallery.dataset.initialized = "true";

            const slides = gallery.querySelector(".product-card__slides");
            const dots = [...gallery.querySelectorAll("[data-product-card-dot]")];
            const colorImage = gallery.querySelector(
                "[data-product-card-color-image]"
            );

            if (!slides || !dots.length) return;

            const setActiveDot = (index) => {
                dots.forEach((dot, dotIndex) => {
                    const isActive = dotIndex === index;
                    dot.classList.toggle("is-active", isActive);
                    dot.setAttribute("aria-current", String(isActive));
                });
            };

            const showRandomColor = () => {
                if (!colorImage) return;

                const colors = colorImage.dataset.productColors
                    .split(",")
                    .filter(Boolean);

                if (!colors.length) return;

                const currentColor = colorImage.dataset.currentColor;
                const alternatives = colors.filter(
                    color => color !== currentColor
                );
                const choices = alternatives.length ? alternatives : colors;
                const nextColor = choices[
                    Math.floor(Math.random() * choices.length)
                ];

                colorImage.dataset.currentColor = nextColor;
                colorImage.alt = colorImage.alt.replace(
                    / – .*$/,
                    ` – ${nextColor}`
                );
                colorImage.onerror = () => {
                    colorImage.onerror = () => {
                        colorImage.onerror = null;
                        colorImage.src =
                            "./assets/images/placeholders/placeholder.svg";
                    };
                    colorImage.src = colorImage.dataset.fallback;
                };
                colorImage.src =
                    `${colorImage.dataset.productFolder}${nextColor}.webp`;
            };

            let activeIndex = 0;

            const setActiveSlide = (index) => {
                if (index === activeIndex) return;

                activeIndex = index;

                if (index === 1) {
                    showRandomColor();
                }

                setActiveDot(index);
            };

            dots.forEach((dot) => {
                dot.addEventListener("click", () => {
                    const index = Number(dot.dataset.productCardDot);

                    slides.scrollTo({
                        left: slides.clientWidth * index,
                        behavior: "smooth"
                    });
                });
            });

            let frame = null;

            slides.addEventListener("scroll", () => {
                if (frame) cancelAnimationFrame(frame);

                frame = requestAnimationFrame(() => {
                    const index = Math.round(
                        slides.scrollLeft / Math.max(slides.clientWidth, 1)
                    );

                    setActiveSlide(
                        Math.min(Math.max(index, 0), dots.length - 1)
                    );
                });
            }, { passive: true });

        });

}
