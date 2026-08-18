/* ==========================================================
   Collection Card
========================================================== */

/**
 * Erstellt eine Collection-Karte.
 *
 * @param {Object} collection
 * @returns {string}
 */
export function createCollectionCard(collection) {

    return `

        <article class="collection-card">

            <a
                class="collection-card__link"
                href="collection.html?id=${collection.id}"
            >

                <img
                    class="collection-card__image"
                    src="${collection.media.thumbnail}"
                    alt="${collection.content.name}"
                    loading="lazy"
                >


                <div class="collection-card__overlay">

                    <div class="collection-card__content">

                        <h3 class="collection-card__title">

                            ${collection.content.name}

                        </h3>


                        <p class="collection-card__description">

                            ${collection.content.description}

                        </p>


                        <span class="collection-card__button">

                            Kollektion ansehen →

                        </span>

                    </div>

                </div>

            </a>

        </article>

    `;

}