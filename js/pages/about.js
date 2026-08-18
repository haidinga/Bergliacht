/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";


/* ==========================================================
   About Page
========================================================== */

async function initializeAboutPage() {

    try {

        const data = await loadData();

        renderHeader(data.settings, data.products);
        renderFooter(data.settings);

    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Über-uns-Seite:",
            error
        );

    }

}


/* ==========================================================
   Start
========================================================== */

initializeAboutPage();
