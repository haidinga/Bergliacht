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
                    product.content.description,
                    true
                )}

                ${createItem(
                    "Material",
                    product.specifications.material
                )}

                ${createItem(
                    "Pflege",
                    product.specifications.care
                )}

                ${createItem(
                    "Versand",
                    product.specifications.shipping
                )}

                ${createItem(
                    "Herstellung",
                    product.notes.manufacturing
                )}

                ${createItem(
                    "Besonderheiten",
                    product.notes.surface
                )}

            </div>

        </div>

    `);

    const items = section.querySelectorAll(".accordion__item");

    items.forEach((item) => {

        const button = item.querySelector(".accordion__button");

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("is-open");

            items.forEach((accordionItem) => {

                removeClass(accordionItem, "is-open");

            });

            if (!isOpen) {

                addClass(item, "is-open");

            }

        });

    });

}

/* ==========================================================
   Accordion Item
========================================================== */

function createItem(title, content, open = false) {

    return `

        <div class="accordion__item ${open ? "is-open" : ""}">

            <button
                class="accordion__button"
                type="button"
                aria-expanded="${open}"
            >

                <span class="accordion__title">

                    ${title}

                </span>

                <span class="accordion__icon">

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