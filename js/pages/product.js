/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";
import { renderProductLayout } from "../components/product-layout.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

import { renderProductGallery } from "../components/product-gallery.js";
import { renderProductInfo } from "../components/product-info.js";
import { renderVariantSelector } from "../components/variant-selector.js";
import { initializePriceDisplay } from "../components/price-display.js";
import { renderColorSelector } from "../components/color-selector.js";
import { renderQuantitySelector } from "../components/quantity-selector.js";
import { renderAddToCart } from "../components/add-to-cart.js";
import { renderAccordion } from "../components/accordion.js";
import { renderRelatedProducts } from "../components/related-products.js";

/* ==========================================================
   Product Page
========================================================== */

async function initializeProductPage() {

    try {

        const data = await loadData();

        const params = new URLSearchParams(window.location.search);

        const productId = params.get("id");

        const product = data.products.find(item => item.id === productId);

        if (!product) {

            console.error("❌ Produkt nicht gefunden.");

            return;

        }

        const collection = data.collections.find(item =>
            item.id === product.classification.collection
        );

        product.collectionName = collection
            ? collection.content.name
            : "";

        /* ------------------------------------------
           Nur verfügbare Farben laden
        ------------------------------------------ */

        const availableColors = data.colors.filter(color =>
            product.colors.includes(color.id)
        );

        const previewColor = availableColors.some(
            color => color.id === "anthrazit"
        )
            ? "anthrazit"
            : availableColors[0]?.id ?? null;

        /* ------------------------------------------
           Layout
        ------------------------------------------ */

        renderHeader(data.settings, data.products);

        // Breadcrumb entfernt

        renderProductLayout();

        renderProductGallery(
            product,
            null,
            previewColor
        );

        renderProductInfo(product);

        renderVariantSelector(product);

        initializePriceDisplay();

        renderColorSelector(
            availableColors
        );

        renderQuantitySelector();

        renderAddToCart(product);

        renderAccordion(product);

        renderRelatedProducts(
            product,
            data.products
        );

        renderFooter(data.settings);

        initializePageScrollIndicator();

        /* ------------------------------------------
           Galerie aktualisieren
        ------------------------------------------ */

        document.addEventListener("colorChanged", (event) => {

            renderProductGallery(
                product,
                event.detail.id,
                previewColor
            );

        });

    } catch (error) {

        console.error(
            "❌ Fehler beim Laden der Produktseite:",
            error
        );

    }

}

/* ==========================================================
   Start
========================================================== */

initializeProductPage();


/* ==========================================================
   Page Scroll Indicator
========================================================== */

function initializePageScrollIndicator() {

    const indicator = document.createElement("div");

    indicator.className = "product-scroll-indicator";
    indicator.setAttribute("aria-hidden", "true");

    document.body.append(indicator);

    let frame = null;
    let hideTimer = null;

    const updateIndicator = () => {

        const maximumScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
        );
        const progress = Math.min(
            Math.max(window.scrollY / maximumScroll, 0),
            1
        );
        const indicatorHeight = indicator.offsetHeight;
        const maximumTravel = Math.max(
            window.innerHeight - indicatorHeight - 32,
            0
        );

        indicator.style.setProperty(
            "--scroll-indicator-offset",
            `${progress * maximumTravel}px`
        );

        indicator.classList.add("is-visible");

        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => {
            indicator.classList.remove("is-visible");
        }, 700);

        frame = null;

    };

    const requestUpdate = () => {

        if (frame) return;

        frame = requestAnimationFrame(updateIndicator);

    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

}
