/* ==========================================================
   Imports
========================================================== */

import { createProductCard } from "./product-card.js";
import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Product Grid
========================================================== */

/**
 * Rendert alle aktiven Produkte.
 *
 * @param {Array} products
 */
export function renderProductGrid(products) {

    const section = getElement("#products");

    if (!section) return;

    const activeProducts = products.filter((product) => {

        return product.active;

    });

    setHTML(section, `

        <div class="container">

            <div class="section-header">

                <p class="section-header__eyebrow">

                    Produkte

                </p>

                <h2 class="section-header__title">

                    Alle Produkte

                </h2>

                <p class="section-header__description">

                    Entdecke unsere gesamte Kollektion
                    zeitloser Wohnaccessoires.

                </p>

            </div>

            <div class="product-grid">

                ${activeProducts
                    .map((product) => createProductCard(product))
                    .join("")}

            </div>

        </div>

    `);

}