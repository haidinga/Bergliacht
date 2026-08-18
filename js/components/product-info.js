/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";
import { formatPrice } from "../utils/currency.js";
import { createIcon } from "./icon.js";
import { isProductFavorite } from "./favorites.js";

/* ==========================================================
   Product Info
========================================================== */

export function renderProductInfo(product) {

    const section = getElement("#product-info");

    if (!section) return;

    const startingPrice = Math.min(
        ...product.variants.map((variant) => variant.price)
    );

    const isFavorite = isProductFavorite(product.id);

    setHTML(section, `
        <div class="product-info">
            <div class="product-info__header">
                <p class="product-info__brand">BERGLIACHT</p>

                <div class="product-info__heading-row">
                    <h1 class="product-info__title">
                        ${product.content.name}
                    </h1>

                    <button
                        class="product-info__favorite favorite-button ${
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

                <div
                    id="product-price"
                    class="product-info__price"
                >
                    ab ${formatPrice(startingPrice)}
                </div>

                <p class="product-info__description">
                    ${product.content.shortDescription}
                </p>
            </div>

            <div class="product-info__benefits">
                <div class="product-info__benefit">
                    ${createIcon("shield-check")}
                    <strong>Nachhaltig</strong>
                    <span>Aus PLA gefertigt</span>
                </div>

                <div class="product-info__benefit">
                    ${createIcon("package")}
                    <strong>3D-Druck</strong>
                    <span>Mit höchster Präzision</span>
                </div>

                <div class="product-info__benefit">
                    ${createIcon("heart")}
                    <strong>Mit Liebe</strong>
                    <span>Für dein Zuhause</span>
                </div>
            </div>

            <div class="product-info__section product-info__section--variants">
                <div id="variant-selector"></div>
            </div>

            <div class="product-info__section product-info__section--colors">
                <div id="color-selector"></div>
            </div>

            <div class="product-info__section product-info__purchase">
                <div id="quantity-selector"></div>
                <div id="add-to-cart"></div>
            </div>
        </div>
    `);

}
