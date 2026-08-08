/* ==========================================================
   Imports
========================================================== */

import {
    getElement,
    setHTML,
    addClass,
    removeClass
} from "../utils/dom.js";

/* ==========================================================
   Variant Selector
========================================================== */

/**
 * Rendert die Größenauswahl.
 *
 * @param {Object} product
 */
export function renderVariantSelector(product) {

    const section = getElement("#variant-selector");

    if (!section) return;

    setHTML(section, `

        <div class="variant-selector">

            <p class="variant-selector__label">
                Größe
            </p>

            <div class="variant-selector__options">

                ${product.variants.map((variant) => `

                    <button
                        class="variant-selector__button"
                        type="button"
                        data-id="${variant.id}"
                        data-price="${variant.price}"
                    >

                        ${variant.label}

                    </button>

                `).join("")}

            </div>

        </div>

    `);

    const buttons = section.querySelectorAll(
        ".variant-selector__button"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            buttons.forEach((item) => {

                removeClass(item, "is-active");

            });

            addClass(button, "is-active");

            document.dispatchEvent(
                new CustomEvent("variantChanged", {

                    detail: {

                        id: button.dataset.id,

                        price: Number(button.dataset.price)

                    }

                })
            );

        });

    });

}