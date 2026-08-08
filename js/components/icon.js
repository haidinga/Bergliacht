/* ==========================================================
   Constants
========================================================== */

const ICON_PATH = "./assets/icons";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Erstellt ein SVG-Icon.
 *
 * @param {string} name
 * @returns {string}
 */
export function createIcon(name) {

    return `
        <img
            class="icon"
            src="./assets/icons/${name}.svg"
            alt=""
            aria-hidden="true"
        >
    `;

}