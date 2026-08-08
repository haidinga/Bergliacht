/* ==========================================================
   Imports
========================================================== */

import { loadJSON } from "../core/loader.js";

/* ==========================================================
   Public Functions
========================================================== */

/**
 * Lädt die globalen Shop-Einstellungen.
 *
 * @returns {Promise<Object>}
 */
export async function getSettings() {

    return await loadJSON("./data/settings.json");

}