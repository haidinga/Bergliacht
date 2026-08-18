/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { createProductCard } from "../components/product-card.js";
import { getElement, setHTML } from "../utils/dom.js";


/* ==========================================================
   Category Page
========================================================== */

async function initializeCategoryPage() {

    try {

        const data = await loadData();
        const categoryId = document.body.dataset.category;
        const category = data.categories.find(
            item => item.id === categoryId
        );

        renderHeader(data.settings, data.products);
        renderFooter(data.settings);

        if (!category) {
            renderError();
            return;
        }

        const products = data.products.filter(product =>
            product.active &&
            product.classification?.category === category.id
        );

        renderCategoryHero(category, data.settings);
        renderCategoryProducts(category, products);

        document.title = `${category.content.name} | Bergliacht`;

    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Kategorieseite:",
            error
        );

        renderError();

    }

}


/* ==========================================================
   Hero
========================================================== */

function renderCategoryHero(category, settings) {

    const section = getElement("#category-hero");

    if (!section) return;

    const image = category.media?.banner || settings.media.placeholder;

    setHTML(section, `
        <div class="container">
            <div class="category-hero">
                <div class="category-hero__content">
                    <p class="category-hero__eyebrow">Kategorie</p>
                    <h1>${category.content.name}</h1>
                    <p>${category.content.description}</p>
                </div>

                <div class="category-hero__media">
                    <img
                        src="${image}"
                        data-fallback="${settings.media.placeholder}"
                        alt="${category.content.name} von Bergliacht"
                    >
                </div>
            </div>
        </div>
    `);

    const heroImage = section.querySelector(".category-hero__media img");

    heroImage?.addEventListener(
        "error",
        () => {
            heroImage.src = heroImage.dataset.fallback;
        },
        { once: true }
    );

}


/* ==========================================================
   Products
========================================================== */

function renderCategoryProducts(category, products) {

    const section = getElement("#category-products");

    if (!section) return;

    if (!products.length) {

        setHTML(section, `
            <div class="container">
                <div class="category-products__empty">
                    <p class="category-products__eyebrow">
                        ${category.content.name}
                    </p>
                    <h2>Neue Produkte sind in Vorbereitung.</h2>
                    <p>
                        Diese Kategorie wird gerade für dich aufgebaut.
                        Schau bald wieder vorbei und entdecke neue Designs.
                    </p>
                    <a href="index.html#products">Alle Produkte entdecken</a>
                </div>
            </div>
        `);

        return;

    }

    setHTML(section, `
        <div class="container">
            <div class="category-products__header">
                <div>
                    <p class="category-products__eyebrow">
                        ${products.length} ${
                            products.length === 1 ? "Produkt" : "Produkte"
                        }
                    </p>
                    <h2>Alle ${category.content.name}</h2>
                </div>

                <p>
                    Entdecke alle verfügbaren Designs dieser Kategorie.
                </p>
            </div>

            <div class="product-grid">
                ${products.map(createProductCard).join("")}
            </div>
        </div>
    `);

}


/* ==========================================================
   Error
========================================================== */

function renderError() {

    const section = getElement("#category-products");

    if (!section) return;

    setHTML(section, `
        <div class="container">
            <div class="category-products__empty">
                <h1>Kategorie nicht gefunden</h1>
                <p>Die gewünschte Kategorie konnte nicht geladen werden.</p>
                <a href="index.html">Zur Startseite</a>
            </div>
        </div>
    `);

}


/* ==========================================================
   Start
========================================================== */

initializeCategoryPage();
