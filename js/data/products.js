/* ==========================================================
   Imports
========================================================== */

import { loadJSON } from "../core/loader.js";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Lädt alle Produkte des Shops.
 *
 * @returns {Promise<Array>}
 */
export async function getProducts() {

    const products = await loadJSON("./data/products.json");

    return products.data;

}