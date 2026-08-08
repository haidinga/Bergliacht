/* ==========================================================
   Imports
========================================================== */

import { loadJSON } from "../core/loader.js";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Lädt alle Produktkategorien.
 *
 * @returns {Promise<Array>}
 */
export async function getCategories() {

    const categories = await loadJSON("./data/categories.json");

    return categories.data;

}