/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { renderCollectionGrid } from "../components/collection-grid.js";


/* ==========================================================
   Collections Page
========================================================== */

async function initializeCollectionsPage() {

    try {

        const data = await loadData();

        renderHeader(data.settings, data.products);

        renderCollectionGrid(
            data.collections,
            data.products,
            {
                limit: null,
                showAllLink: false,
                title: "Alle Kollektionen"
            }
        );

        renderFooter(data.settings);

    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Kollektionen:",
            error
        );

    }

}

initializeCollectionsPage();
