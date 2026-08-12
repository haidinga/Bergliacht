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
                        data-label="${variant.label}"
                        data-price="${variant.price}"
                    >

                        ${variant.label}

                    </button>

                `).join("")}

            </div>

        </div>

    `);


    /* ======================================================
       Buttons
    ====================================================== */

    const buttons = section.querySelectorAll(
        ".variant-selector__button"
    );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach((item) => {

                    removeClass(
                        item,
                        "is-active"
                    );

                });


                addClass(
                    button,
                    "is-active"
                );


                /* ------------------------------------------
                   Variant Event
                ------------------------------------------ */

                document.dispatchEvent(
                    new CustomEvent(
                        "variantChanged",
                        {
                            detail: {

                                id:
                                    button.dataset.id,

                                label:
                                    button.dataset.label,

                                price:
                                    Number(
                                        button.dataset.price
                                    )

                            }
                        }
                    )
                );

            }
        );

    });

}


/* ==========================================================
   Highlight Missing Selection
========================================================== */

export function highlightVariantSelection() {

    const section =
        getElement("#variant-selector");

    if (!section) return;


    const buttons =
        section.querySelectorAll(
            ".variant-selector__button"
        );


    if (!buttons.length) return;


    buttons.forEach((button) => {

        removeClass(
            button,
            "is-shaking"
        );

    });


    /* Force animation restart */

    void section.offsetWidth;


    buttons.forEach((button) => {

        addClass(
            button,
            "is-shaking"
        );

    });


    setTimeout(() => {

        buttons.forEach((button) => {

            removeClass(
                button,
                "is-shaking"
            );

        });

    }, 500);

}