/* ==========================================================
   Collection Card
========================================================== */

/**
 * Erstellt eine Collection-Karte.
 *
 * @param {Object} collection
 * @param {number} productCount
 * @returns {string}
 */
export function createCollectionCard(collection, productCount = 0) {

    return `
        <article class="collection-card">
            <a
                class="collection-card__link"
                href="collection.html?id=${collection.id}"
            >
                <div class="collection-card__media">
                    <img
                        class="collection-card__image"
                        src="${collection.media.thumbnail}"
                        data-fallback="./assets/images/placeholders/placeholder.svg"
                        alt="${collection.content.name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src=this.dataset.fallback"
                    >
                </div>

                <div class="collection-card__content">
                    <h3 class="collection-card__title">
                        ${collection.content.name}
                    </h3>

                    <p class="collection-card__count">
                        ${productCount} ${productCount === 1 ? "Produkt" : "Produkte"}
                    </p>
                </div>
            </a>
        </article>
    `;

}
