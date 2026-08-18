/* ==========================================================
   Imports
========================================================== */

import {
    createProductCard,
    initializeProductCards
} from "./product-card.js";
import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Featured Products
========================================================== */

/**
 * Rendert die empfohlenen Produkte.
 *
 * @param {Array} products
 */
export function renderFeaturedProducts(products) {

    const section = getElement("#featured-products");

    if (!section) return;

    const featuredProducts = products.filter((product) => {

        return product.active &&
               product.classification.featured;

    });

    setHTML(section, `

        <div class="container">

            <div class="section-header">

                <p class="section-header__eyebrow">

                    Empfehlungen

                </p>

                <h2 class="section-header__title">

                    Unsere Empfehlungen

                </h2>

                <p class="section-header__description">

                    Entdecke ausgewählte Designs,
                    die modernes Wohnen bereichern.

                </p>

            </div>

            <div class="product-grid">

                ${featuredProducts
                    .map((product) => createProductCard(product))
                    .join("")}

            </div>

        </div>

    `);

    initializeProductCards(section);

}
