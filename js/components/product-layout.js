/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Product Layout
========================================================== */

/**
 * Rendert das Grundlayout der Produktseite.
 */
export function renderProductLayout() {

    const section = getElement("#product-detail");

    if (!section) {

        console.error("❌ Produktbereich nicht gefunden.");

        return;

    }

    setHTML(section, `

        <section class="product-page">

            <div class="container">

                <div class="product-page__layout">

                    <aside
                        id="product-gallery"
                        class="product-page__gallery"
                    ></aside>

                    <main
                        id="product-info"
                        class="product-page__info"
                    ></main>

                </div>

            </div>

        </section>

    `);

}