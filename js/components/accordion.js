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
   Accordion
========================================================== */

/**
 * Rendert den Produkt-Accordion.
 *
 * @param {Object} product
 */
export function renderAccordion(product) {

    const section = getElement("#product-description");

    if (!section) return;

    setHTML(section, `

        <div class="container">

            <div class="accordion">

                ${createItem(
                    "Beschreibung",
                    product.content.description
                )}

                ${createItem(
                    "Pflege",
                    product.specifications.care
                )}

                ${createItem(
                    "Herstellung",
                    product.notes.manufacturing
                )}

                ${createItem(
                    "Material",
                    product.notes.material
                )}

                ${createItem(
                    "Besonderheiten",
                    product.notes.surface
                )}

            </div>

        </div>

    `);

    const items = section.querySelectorAll(
        ".accordion__item"
    );

    items.forEach((item) => {

        const button = item.querySelector(
            ".accordion__button"
        );

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains(
                "is-open"
            );

            items.forEach((accordionItem) => {

                removeClass(
                    accordionItem,
                    "is-open"
                );

                const accordionButton =
                    accordionItem.querySelector(
                        ".accordion__button"
                    );

                if (accordionButton) {

                    accordionButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

            if (!isOpen) {

                addClass(item, "is-open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

}

/* ==========================================================
   Accordion Item
========================================================== */

function createItem(title, content) {

    return `

        <div class="accordion__item">

            <button
                class="accordion__button"
                type="button"
                aria-expanded="false"
            >

                <span class="accordion__title">
                    ${title}
                </span>

                <span
                    class="accordion__icon"
                    aria-hidden="true"
                >
                    +
                </span>

            </button>

            <div class="accordion__content">

                <p>
                    ${content ?? ""}
                </p>

            </div>

        </div>

    `;

}