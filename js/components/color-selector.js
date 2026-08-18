/* ==========================================================
   Imports
========================================================== */

import {
    getElement,
    setHTML,
    addClass,
    removeClass
} from "../utils/dom.js";

const COLOR_BRIGHTNESS_ORDER = [
    "bone-white",
    "porzellan",
    "yellow",
    "beige",
    "silver",
    "oak",
    "gold",
    "sakura-pink",
    "taro-purple",
    "blue-grey",
    "grass-green",
    "olive",
    "clay",
    "red",
    "roasted-chestnut",
    "coffee",
    "anthrazit",
    "midnight",
    "black"
];

const LIGHT_COLOR_IDS = new Set([
    "bone-white",
    "porzellan",
    "beige",
    "sakura-pink",
    "silver"
]);

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

    const activeColors = colors
        .filter(color => color.active)
        .sort(compareColorBrightness);

    if (activeColors.length === 0) return;

    setHTML(section, `

        <div class="color-selector">

            <p class="color-selector__label">

                Farbe

            </p>

            <div class="color-selector__swatches">

                ${activeColors.map((color) => `

                    <button
                        class="color-selector__swatch ${
                            LIGHT_COLOR_IDS.has(color.id)
                                ? "is-light"
                                : ""
                        }"
                        type="button"
                        data-id="${color.id}"
                        data-name="${color.content.name}"
                        data-hex="${color.color.hex}"
                        style="--swatch-image: url('${color.media.swatch}')"
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
                hidden
            >
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
            selectedName.hidden = false;

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


/* ==========================================================
   Color Brightness
========================================================== */

function getColorBrightness(hexColor = "") {

    const normalizedHex = hexColor
        .replace("#", "")
        .trim();

    const fullHex = normalizedHex.length === 3
        ? normalizedHex
            .split("")
            .map(character => character + character)
            .join("")
        : normalizedHex;

    if (!/^[0-9a-f]{6}$/i.test(fullHex)) return 0;

    const red = parseInt(fullHex.slice(0, 2), 16);
    const green = parseInt(fullHex.slice(2, 4), 16);
    const blue = parseInt(fullHex.slice(4, 6), 16);

    return (
        (red * 0.2126) +
        (green * 0.7152) +
        (blue * 0.0722)
    );

}

function compareColorBrightness(firstColor, secondColor) {

    const firstPosition = COLOR_BRIGHTNESS_ORDER.indexOf(firstColor.id);
    const secondPosition = COLOR_BRIGHTNESS_ORDER.indexOf(secondColor.id);

    if (firstPosition !== -1 || secondPosition !== -1) {
        return (
            (firstPosition === -1 ? Number.MAX_SAFE_INTEGER : firstPosition) -
            (secondPosition === -1 ? Number.MAX_SAFE_INTEGER : secondPosition)
        );
    }

    return (
        getColorBrightness(secondColor.color?.hex) -
        getColorBrightness(firstColor.color?.hex)
    );

}


/* ==========================================================
   Highlight Missing Selection
========================================================== */

export function highlightColorSelection() {

    const section = getElement("#color-selector");

    if (!section) return;

    const buttons = section.querySelectorAll(
        ".color-selector__swatch"
    );

    if (!buttons.length) return;

    buttons.forEach((button) => {
        removeClass(button, "is-shaking");
    });

    /* Force animation restart */

    void section.offsetWidth;

    buttons.forEach((button) => {
        addClass(button, "is-shaking");
    });

    setTimeout(() => {

        buttons.forEach((button) => {
            removeClass(button, "is-shaking");
        });

    }, 500);

}
