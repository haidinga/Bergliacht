/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Add To Cart
========================================================== */

/**
 * Rendert den Warenkorb-Bereich.
 *
 * Der eigentliche Warenkorb wird in Sprint 3 entwickelt.
 */
export function renderAddToCart() {

    const section = getElement("#add-to-cart");

    if (!section) return;

    setHTML(section, `

        <div class="add-to-cart">

            <button
                id="add-to-cart-button"
                class="add-to-cart__button"
                type="button"
            >

                In den Warenkorb

            </button>

            <p class="add-to-cart__hint">

                Individuell für dich gefertigt.

            </p>

        </div>

    `);

    const button = getElement("#add-to-cart-button");

    let selectedVariant = null;
    let selectedColor = null;
    let quantity = 1;

    document.addEventListener("variantChanged", (event) => {

        selectedVariant = event.detail;

    });

    document.addEventListener("colorChanged", (event) => {

        selectedColor = event.detail;

    });

    document.addEventListener("quantityChanged", (event) => {

        quantity = event.detail.quantity;

    });

    button.addEventListener("click", () => {

        console.log("Produkt zum Warenkorb hinzufügen:");

        console.log({

            variant: selectedVariant,
            color: selectedColor,
            quantity

        });

        document.dispatchEvent(new CustomEvent("addToCart", {

            detail: {

                variant: selectedVariant,
                color: selectedColor,
                quantity

            }

        }));

    });

}