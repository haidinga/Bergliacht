/* ==========================================================
   Imports
========================================================== */

import { loadJSON } from "../core/loader.js";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Lädt alle verfügbaren Farben.
 *
 * @returns {Promise<Array>}
 */
export async function getColors() {

    const colors = await loadJSON("./data/colors.json");

    return colors.data;

}