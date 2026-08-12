/* ==========================================================
   Product Card
========================================================== */

/**
 * Erstellt eine Produktkarte.
 *
 * @param {Object} product
 * @returns {string}
 */
export function createProductCard(product) {

    const startingPrice = Math.min(
        ...product.variants.map((variant) => variant.price)
    );

    const thumbnailImage =
        `${product.media.folder}${product.media.thumbnail}`;

    return `

        <article class="product-card">

            <a
                class="product-card__link"
                href="product.html?id=${product.id}"
                aria-label="${product.content.name}"
            >

                <div class="product-card__media">

                    <img
                        class="product-card__image"
                        src="${thumbnailImage}"
                        alt="${product.content.name}"
                        loading="lazy"
                    >

                </div>

                <div class="product-card__content">

                    <h3 class="product-card__title">

                        ${product.content.name}

                    </h3>

                    <p class="product-card__description">

                        ${product.content.shortDescription}

                    </p>

                    <div class="product-card__footer">

                        <span class="product-card__price">

                            ab ${startingPrice.toFixed(2).replace(".", ",")} €

                        </span>

                    </div>

                </div>

            </a>

        </article>

    `;

}