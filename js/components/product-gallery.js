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
 * @param {String|null} previewColor
 */
export function renderProductGallery(
    product,
    selectedColor = null,
    previewColor = "anthrazit"
) {

    const gallery = getElement("#product-gallery");

    if (!gallery) return;

    const folder = product.media.folder;

    const thumbnailImage =
        `${folder}${product.media.thumbnail}`;

    const sceneImage =
        `${folder}${product.media.scene}`;

    const displayedColor =
        selectedColor || previewColor;

    const colorImage =
        `${folder}${displayedColor}.webp`;

    /*
     * Ohne Auswahl bleibt das Thumbnail das Hauptbild.
     * Das zweite Vorschaubild zeigt trotzdem bereits Anthrazit.
     */
    const mainImage = selectedColor
        ? colorImage
        : thumbnailImage;

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

                <!--
                    Thumbnail:
                    bleibt immer gleich
                -->

                <button
                    class="product-gallery__thumbnail ${
                        !selectedColor ? "is-active" : ""
                    }"
                    type="button"
                    data-image="${thumbnailImage}"
                    aria-label="Produktübersicht"
                >

                    <img
                        src="${thumbnailImage}"
                        alt="${product.content.name} – Produktübersicht"
                    >

                </button>


                <!--
                    Aktuelle Farbe:
                    ändert sich mit der Farbauswahl
                -->

                <button
                    class="product-gallery__thumbnail ${
                        selectedColor ? "is-active" : ""
                    }"
                    type="button"
                    data-image="${colorImage}"
                    aria-label="Produktfarbe"
                >

                    <img
                        src="${colorImage}"
                        alt="${product.content.name} – ${displayedColor}"
                    >

                </button>


                <!--
                    Szenenbild:
                    bleibt immer gleich
                -->

                <button
                    class="product-gallery__thumbnail"
                    type="button"
                    data-image="${sceneImage}"
                    aria-label="Produkt in Szene"
                >

                    <img
                        src="${sceneImage}"
                        alt="${product.content.name} – Wohnszene"
                    >

                </button>

            </div>

        </div>

    `);


    /* ======================================================
       Main Image
    ====================================================== */

    const main = getElement(
        "#product-gallery-image",
        gallery
    );

    if (!main) return;


    /* ======================================================
       Thumbnail Interaction
    ====================================================== */

    const thumbnails = gallery.querySelectorAll(
        ".product-gallery__thumbnail"
    );

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


    /* ======================================================
       Image Transition
    ====================================================== */

    main.addEventListener("load", () => {

        main.style.opacity = "1";

    });

}
