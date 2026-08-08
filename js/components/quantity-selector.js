/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Quantity Selector
========================================================== */

/**
 * Rendert die Mengenauswahl.
 */
export function renderQuantitySelector() {

    const section = getElement("#quantity-selector");

    if (!section) return;

    setHTML(section, `

        <div class="quantity-selector">

            <p class="quantity-selector__label">

                Menge

            </p>

            <div class="quantity-selector__controls">

                <button
                    id="quantity-decrease"
                    class="quantity-selector__button"
                    type="button"
                    aria-label="Menge verringern"
                >

                    −

                </button>

                <span
                    id="quantity-value"
                    class="quantity-selector__value"
                >

                    1

                </span>

                <button
                    id="quantity-increase"
                    class="quantity-selector__button"
                    type="button"
                    aria-label="Menge erhöhen"
                >

                    +

                </button>

            </div>

        </div>

    `);

    const decrease = getElement("#quantity-decrease");
    const increase = getElement("#quantity-increase");
    const value = getElement("#quantity-value");

    let quantity = 1;

    const updateQuantity = () => {

        value.textContent = quantity;

        document.dispatchEvent(new CustomEvent("quantityChanged", {

            detail: {

                quantity

            }

        }));

    };

    decrease.addEventListener("click", () => {

        if (quantity <= 1) return;

        quantity--;

        updateQuantity();

    });

    increase.addEventListener("click", () => {

        quantity++;

        updateQuantity();

    });

    updateQuantity();

}