/* ==========================================================
   Imports
========================================================== */

import { createCollectionCard } from "./collection-card.js";
import { getElement, setHTML } from "../utils/dom.js";
import { createIcon } from "./icon.js";


/* ==========================================================
   Collection Grid
========================================================== */

/**
 * Rendert aktive Kollektionen.
 *
 * @param {Array} collections
 * @param {Array} products
 * @param {Object} options
 */
export function renderCollectionGrid(
    collections,
    products = [],
    options = {}
) {

    const section = getElement("#collections");

    if (!section) return;

    const {
        limit = 4,
        showAllLink = true,
        title = "Kollektionen entdecken"
    } = options;

    const activeCollections = collections
        .filter(collection => collection.active)
        .sort((first, second) =>
            (first.sorting?.order ?? 0) -
            (second.sorting?.order ?? 0)
        );

    const displayedCollections = limit === null
        ? activeCollections
        : activeCollections.slice(0, limit);

    const getProductCount = collectionId => products.filter(product =>
        product.active &&
        product.classification?.collection === collectionId
    ).length;

    setHTML(section, `
        <div class="container">
            <div class="collections-header">
                <h2>${title}</h2>

                ${showAllLink
                    ? `<a class="collections-header__link" href="collections.html">
                        <span>Alle ansehen</span>
                        ${createIcon("arrow-right")}
                    </a>`
                    : ""
                }
            </div>

            <div class="collection-grid ${
                showAllLink ? "collection-grid--home" : "collection-grid--all"
            }">
                ${displayedCollections
                    .map(collection => createCollectionCard(
                        collection,
                        getProductCount(collection.id)
                    ))
                    .join("")}
            </div>
        </div>
    `);

}
