/* ==========================================================
   Imports
========================================================== */

import { initHomePage } from "../pages/home.js";

/* ==========================================================
   Public Functions
========================================================== */

export async function initApp() {

    console.log("🚀 Bergliacht gestartet");

    await initHomePage();

}