/* ==========================================================
   Imports
========================================================== */

import { loadJSON } from "../core/loader.js";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Lädt alle Produktkollektionen.
 *
 * @returns {Promise<Array>}
 */
export async function getCollections() {

    const collections = await loadJSON("./data/collections.json");

    return collections.data;

}