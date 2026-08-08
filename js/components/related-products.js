/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";
import { createProductCard } from "./product-card.js";

/* ==========================================================
   Related Products
========================================================== */

/**
 * Rendert ähnliche Produkte.
 *
 * @param {Object} currentProduct
 * @param {Array} products
 */
export function renderRelatedProducts(currentProduct, products) {

    const section = getElement("#related-products");

    if (!section) return;

    const relatedProducts = products
        .filter((product) => {

            return (
                product.active &&
                product.id !== currentProduct.id &&
                product.collection === currentProduct.collection
            );

        })
        .slice(0, 3);

    if (relatedProducts.length === 0) {

        setHTML(section, "");

        return;

    }

    setHTML(section, `

        <div class="container">

            <div class="section-header">

                <p class="section-header__eyebrow">

                    Das könnte dir gefallen

                </p>

                <h2 class="section-header__title">

                    Ähnliche Produkte

                </h2>

                <p class="section-header__description">

                    Weitere Designs aus derselben Kollektion.

                </p>

            </div>

            <div class="product-grid">

                ${relatedProducts
                    .map((product) => createProductCard(product))
                    .join("")}

            </div>

        </div>

    `);

}