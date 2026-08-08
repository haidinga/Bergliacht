/* ==========================================================
   Imports
========================================================== */

import { createCollectionCard } from "./collection-card.js";
import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Collection Grid
========================================================== */

/**
 * Rendert alle aktiven Kollektionen.
 *
 * @param {Array} collections
 */
export function renderCollectionGrid(collections) {

    const section = getElement("#collections");

    if (!section) return;

    const activeCollections = collections.filter((collection) => {

        return collection.active;

    });

    setHTML(section, `

        <div class="container">

            <div class="section-header">

                <p class="section-header__eyebrow">

                    Kollektionen

                </p>

                <h2 class="section-header__title">

                    Entdecke unsere Designwelten

                </h2>

                <p class="section-header__description">

                    Inspiriert von natürlichen Formen, modernen Wohnräumen
                    und der Ruhe der Alpen.

                </p>

            </div>

            <div class="collection-grid">

                ${activeCollections
                    .map((collection) => createCollectionCard(collection))
                    .join("")}

            </div>

        </div>

    `);

}