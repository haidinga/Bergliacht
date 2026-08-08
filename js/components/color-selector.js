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
   Color Selector
========================================================== */

/**
 * Rendert die Farbauswahl.
 *
 * @param {Array} colors
 */
export function renderColorSelector(colors) {

    const section = getElement("#color-selector");

    if (!section) return;

    const activeColors = colors.filter(color => color.active);

    if (activeColors.length === 0) return;

    const defaultColor = activeColors[0];

    setHTML(section, `

        <div class="color-selector">

            <p class="color-selector__label">

                Farbe

            </p>

            <div class="color-selector__swatches">

                ${activeColors.map((color, index) => `

                    <button
                        class="color-selector__swatch ${index === 0 ? "is-active" : ""}"
                        type="button"
                        data-id="${color.id}"
                        data-name="${color.content.name}"
                        data-hex="${color.color.hex}"
                        aria-label="${color.content.name}"
                    >

                        <img
                            src="${color.media.swatch}"
                            alt="${color.content.name}"
                            class="color-selector__swatch-image"
                        >

                    </button>

                `).join("")}

            </div>

            <p
                id="selected-color-name"
                class="color-selector__current"
            >

                ${defaultColor.content.name}

            </p>

        </div>

    `);

    const selectedName = getElement("#selected-color-name");

    const buttons = section.querySelectorAll(".color-selector__swatch");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(item => {

                removeClass(item, "is-active");

            });

            addClass(button, "is-active");

            selectedName.textContent = button.dataset.name;

            document.dispatchEvent(new CustomEvent("colorChanged", {

                detail: {

                    id: button.dataset.id,
                    name: button.dataset.name,
                    hex: button.dataset.hex

                }

            }));

        });

    });

}