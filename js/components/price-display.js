/* ==========================================================
   Imports
========================================================== */

import { getElement } from "../utils/dom.js";

/* ==========================================================
   Price Display
========================================================== */

/**
 * Initialisiert die Preisanzeige.
 */
export function initializePriceDisplay() {

    const price = getElement("#product-price");

    if (!price) return;

    document.addEventListener("variantChanged", (event) => {

        const { price: variantPrice } = event.detail;

        price.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                {
                    opacity: 0,
                    transform: "translateY(-8px)"
                },
                {
                    opacity: 0,
                    transform: "translateY(8px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 220,
                easing: "ease"
            }
        );

        setTimeout(() => {

            price.textContent =
                `${variantPrice.toFixed(2).replace(".", ",")} EUR`;

        }, 110);

    });

}