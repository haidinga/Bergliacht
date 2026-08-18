/* ==========================================================
   Imports
========================================================== */

import { getElement } from "../utils/dom.js";
import { formatPrice } from "../utils/currency.js";

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

            price.textContent = formatPrice(variantPrice);

        }, 110);

    });

}
