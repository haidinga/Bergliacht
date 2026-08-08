/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";

import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderCollectionGrid } from "../components/collection-grid.js";
import { renderFeaturedProducts } from "../components/featured-products.js";
import { renderProductGrid } from "../components/product-grid.js";
import { renderFooter } from "../components/footer.js";

/* ==========================================================
   Home Page
========================================================== */

/**
 * Initialisiert die Startseite.
 */
export async function initHomePage() {

    try {

        const data = await loadData();
        console.log("DATA:", data);
    console.log("SETTINGS:", data.settings);
    console.log("COLLECTIONS:", data.collections);
    console.log("PRODUCTS:", data.products);

        renderHeader(data.settings);

        renderHero(data.settings);

        renderCollectionGrid(
            data.collections
        );

        renderFeaturedProducts(
            data.products
        );

        renderProductGrid(
            data.products
        );

        renderFooter(data.settings);

    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Startseite:",
            error
        );

    }

}