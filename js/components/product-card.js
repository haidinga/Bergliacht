/* ==========================================================
   Imports
========================================================== */

import { formatPrice } from "../utils/currency.js";
import { createIcon } from "./icon.js";
import { isProductFavorite } from "./favorites.js";


/* ==========================================================
   Product Card
========================================================== */

/**
 * Erstellt eine Produktkarte.
 *
 * @param {Object} product
 * @returns {string}
 */
export function createProductCard(product) {

    const startingPrice = Math.min(
        ...product.variants.map((variant) => variant.price)
    );

    const thumbnailImage =
        `${product.media.folder}${product.media.thumbnail}`;

    const isFavorite = isProductFavorite(product.id);

    return `

        <article class="product-card">

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

            <a
                class="product-card__link"
                href="product.html?id=${product.id}"
                aria-label="${product.content.name}"
            >

                <div class="product-card__media">

                    <img
                        class="product-card__image"
                        src="${thumbnailImage}"
                        alt="${product.content.name}"
                        loading="lazy"
                    >

                </div>

                <div class="product-card__content">

                    <h3 class="product-card__title">

                        ${product.content.name}

                    </h3>

                    <p class="product-card__description">

                        ${product.content.shortDescription}

                    </p>

                    <div class="product-card__footer">

                        <span class="product-card__price">

                            ab ${formatPrice(startingPrice)}

                        </span>

                    </div>

                </div>

            </a>

        </article>

    `;

}
