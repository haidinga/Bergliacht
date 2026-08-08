/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Product Gallery
========================================================== */

/**
 * Rendert die Produktgalerie.
 *
 * @param {Object} product
 * @param {String|null} selectedColor
 */
export function renderProductGallery(product, selectedColor = null) {

    const gallery = getElement("#product-gallery");

    if (!gallery) return;

    const colorKey =
        selectedColor ??
        Object.keys(product.media.colors)[0];

    const media = product.media.colors[colorKey];

    if (!media) return;

    const images = media.gallery ?? [];

    const mainImage =
        media.featuredImage ??
        images[0];

    setHTML(gallery, `

        <div class="product-gallery">

            <div class="product-gallery__main">

                <img
                    id="product-gallery-image"
                    class="product-gallery__image"
                    src="${mainImage}"
                    alt="${product.content.name}"
                >

            </div>

            <div class="product-gallery__thumbnails">

                ${images.map((image, index) => `

                    <button
                        class="product-gallery__thumbnail ${index === 0 ? "is-active" : ""}"
                        type="button"
                        data-image="${image}"
                        aria-label="Produktbild ${index + 1}"
                    >

                        <img
                            src="${image}"
                            alt="${product.content.name}"
                        >

                    </button>

                `).join("")}

            </div>

        </div>

    `);

    const main = getElement("#product-gallery-image", gallery);

    const thumbnails = gallery.querySelectorAll(".product-gallery__thumbnail");

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener("click", () => {

            thumbnails.forEach((item) => {

                item.classList.remove("is-active");

            });

            thumbnail.classList.add("is-active");

            main.style.opacity = "0";

            setTimeout(() => {

                main.src = thumbnail.dataset.image;

            }, 120);

        });

    });

    main.addEventListener("load", () => {

        main.style.opacity = "1";

    });

}