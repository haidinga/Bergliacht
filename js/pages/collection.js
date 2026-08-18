/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

import {
    getElement,
    setHTML
} from "../utils/dom.js";

import {
    createProductCard
} from "../components/product-card.js";


/* ==========================================================
   Initialize Collection Page
========================================================== */

async function initCollectionPage() {

    try {

        /* ======================================================
           Daten laden
        ======================================================= */

        const data =
            await loadData();


        /* ======================================================
           Header
        ======================================================= */

        renderHeader(
            data.settings
        );


        /* ======================================================
           Collection ID aus URL
        ======================================================= */

        const collectionId =
            getCollectionId();


        if (!collectionId) {

            renderError(
                "Keine Kollektion ausgewählt."
            );

            renderFooter(
                data.settings
            );

            return;

        }


        /* ======================================================
           Kollektion suchen
        ======================================================= */

        const collection =
            data.collections.find(
                (item) =>
                    item.id === collectionId
            );


        if (!collection) {

            renderError(
                "Die gewünschte Kollektion wurde nicht gefunden."
            );

            renderFooter(
                data.settings
            );

            return;

        }


        /* ======================================================
           Hero
        ======================================================= */

        renderCollectionHero(
            collection
        );


        /* ======================================================
           Produkte der Kollektion filtern
        ======================================================= */

        const products =
            data.products.filter(
                (product) => {

                    return (
                        product.active &&
                        product.classification?.collection ===
                            collection.id
                    );

                }
            );


        /* ======================================================
           Produkte anzeigen
        ======================================================= */

        renderCollectionProducts(
            collection,
            products
        );


        /* ======================================================
           Seitentitel
        ======================================================= */

        updatePageTitle(
            collection
        );


        /* ======================================================
           Footer
        ======================================================= */

        renderFooter(
            data.settings
        );


    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Kollektion:",
            error
        );


        renderError(
            "Die Kollektion konnte nicht geladen werden."
        );

    }

}


/* ==========================================================
   Get Collection ID
========================================================== */

function getCollectionId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "id"
    );

}


/* ==========================================================
   Render Collection Hero
========================================================== */

function renderCollectionHero(
    collection
) {

    const hero =
        getElement(
            "#collection-hero"
        );


    if (!hero) return;


    const name =
        collection.content?.name ||
        "Kollektion";


    const description =
        collection.content?.description ||
        "";


    const banner =
        collection.media?.banner ||
        "";


    setHTML(
        hero,

        `

            ${
                banner
                    ? `
                        <img
                            class="collection-hero__image"
                            src="${banner}"
                            alt="${name}"
                        >
                    `
                    : ""
            }


            <div
                class="collection-hero__overlay"
            ></div>


            <div
                class="collection-hero__content"
            >

                <p
                    class="collection-hero__eyebrow"
                >
                    Kollektion
                </p>


                <h1
                    class="collection-hero__title"
                >
                    ${name}
                </h1>


                ${
                    description
                        ? `
                            <p
                                class="collection-hero__description"
                            >
                                ${description}
                            </p>
                        `
                        : ""
                }

            </div>

        `

    );

}


/* ==========================================================
   Render Collection Products
========================================================== */

function renderCollectionProducts(
    collection,
    products
) {

    const section =
        getElement(
            "#collection-products"
        );


    if (!section) return;


    const collectionName =
        collection.content?.name ||
        "Kollektion";


    /* ======================================================
       Keine Produkte
    ======================================================= */

    if (!products.length) {

        setHTML(
            section,

            `

                <div
                    class="collection-products__container"
                >

                    <div
                        class="collection-products__empty"
                    >

                        <h2
                            class="collection-products__empty-title"
                        >
                            Noch keine Produkte
                        </h2>


                        <p
                            class="collection-products__empty-text"
                        >
                            In dieser Kollektion sind
                            derzeit keine Produkte verfügbar.
                        </p>

                    </div>

                </div>

            `
        );

        return;

    }


    /* ======================================================
       Produkte anzeigen
    ======================================================= */

    setHTML(
        section,

        `

            <div
                class="collection-products__container"
            >

                <div
                    class="collection-products__header"
                >

                    <p
                        class="collection-products__eyebrow"
                    >

                        ${products.length}

                        ${
                            products.length === 1
                                ? " Produkt"
                                : " Produkte"
                        }

                    </p>


                    <h2
                        class="collection-products__title"
                    >
                        ${collectionName}
                    </h2>


                    <p
                        class="collection-products__description"
                    >
                        Entdecke alle Produkte dieser Kollektion.
                    </p>

                </div>


                <div
                    class="collection-products__grid"
                >

                    ${products
                        .map(
                            (product) =>
                                createProductCard(
                                    product
                                )
                        )
                        .join("")
                    }

                </div>

            </div>

        `

    );

}


/* ==========================================================
   Page Title
========================================================== */

function updatePageTitle(
    collection
) {

    const name =
        collection.content?.name ||
        "Kollektion";


    document.title =
        `${name} | s’Bergliacht`;

}


/* ==========================================================
   Error State
========================================================== */

function renderError(
    message
) {

    const hero =
        getElement(
            "#collection-hero"
        );


    const products =
        getElement(
            "#collection-products"
        );


    /* ======================================================
       Hero leeren
    ======================================================= */

    if (hero) {

        setHTML(
            hero,
            ""
        );

    }


    /* ======================================================
       Fehlermeldung
    ======================================================= */

    if (products) {

        setHTML(
            products,

            `

                <div
                    class="collection-products__container"
                >

                    <div
                        class="collection-products__empty"
                    >

                        <h1
                            class="collection-products__empty-title"
                        >
                            Kollektion nicht gefunden
                        </h1>


                        <p
                            class="collection-products__empty-text"
                        >
                            ${message}
                        </p>

                    </div>

                </div>

            `
        );

    }

}


/* ==========================================================
   Start
========================================================== */

initCollectionPage();