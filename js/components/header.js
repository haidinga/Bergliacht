/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";
import { getElement, setHTML } from "../utils/dom.js";
import { renderSearchDrawer } from "./search-drawer.js";
import { renderFavorites } from "./favorites.js";
import { renderMobileMenu } from "./mobile-menu.js";


/* ==========================================================
   Header
========================================================== */

/**
 * Rendert den Header.
 *
 * @param {Object} settings
 * @param {Array} products
 */
export function renderHeader(settings, products = []) {

    const header = getElement("#header");

    if (!header) return;


    setHTML(header, `

        <div class="container">

            <header class="header">

                <div class="header__mobile-left">

                    <button
                        class="header__icon"
                        type="button"
                        aria-label="Menü öffnen"
                        data-mobile-menu-trigger
                    >
                        ${createIcon("menu")}
                    </button>

                    <button
                        class="header__icon"
                        type="button"
                        aria-label="Suche"
                        data-search-trigger
                    >
                        ${createIcon("search")}
                    </button>

                </div>

                <a
                    class="header__brand"
                    href="index.html"
                    aria-label="${settings.shop.name}"
                >

                    <img
                        class="header__logo"
                        src="${settings.branding.logo}"
                        alt="${settings.shop.name}"
                    >

                </a>


                <nav
                    class="header__navigation"
                    aria-label="Hauptnavigation"
                >

                    <a
                        class="header__link"
                        href="vasen.html"
                    >
                        Vasen
                    </a>

                    <a
                        class="header__link"
                        href="schriftzuege.html"
                    >
                        Schriftzüge
                    </a>

                    <a
                        class="header__link"
                        href="dekoschalen.html"
                    >
                        Dekoschalen
                    </a>

                    <a
                        class="header__link"
                        href="collections.html"
                    >
                        Kollektionen
                    </a>

                    <a
                        class="header__link"
                        href="about.html"
                    >
                        Über uns
                    </a>

                </nav>


                <div class="header__actions">

                    <button
                        class="header__icon header__search--desktop"
                        type="button"
                        aria-label="Suche"
                        data-search-trigger
                    >

                        ${createIcon("search")}

                    </button>


                    <button
                        class="header__icon header__favorite"
                        type="button"
                        aria-label="Favoriten"
                        data-favorites-trigger
                    >

                        ${createIcon("heart")}

                    </button>


                    <a
                        class="header__icon header__cart"
                        href="./cart.html"
                        aria-label="Warenkorb"
                    >

                        ${createIcon("shopping-bag")}

                        <span
                            class="header__cart-count"
                            aria-label="Artikel im Warenkorb"
                        >
                            0
                        </span>

                    </a>

                </div>

            </header>

        </div>

    `);

    renderSearchDrawer(products);
    renderFavorites(products);
    renderMobileMenu();

    initializeHeaderScrollState(header);


    /* ======================================================
       Cart Counter
    ====================================================== */

    updateCartCounter();


    /* ======================================================
       Cart Events
    ====================================================== */

    document.addEventListener(
        "addToCart",
        updateCartCounter
    );

    document.addEventListener(
        "cartUpdated",
        updateCartCounter
    );


    /* ======================================================
       Storage Changes
    ====================================================== */

    window.addEventListener(
        "storage",
        (event) => {

            if (
                event.key === "bergliachtCart"
            ) {

                updateCartCounter();

            }

        }
    );


    /* ======================================================
       Safety Refresh
    ====================================================== */

    setInterval(
        updateCartCounter,
        500
    );

}


/* ==========================================================
   Update Cart Counter
========================================================== */

function updateCartCounter() {

    const counter =
        getElement(".header__cart-count");

    if (!counter) return;


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "bergliachtCart"
                )
            ) || [];

    } catch (error) {

        cart = [];

    }


    const itemCount =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );


    counter.textContent =
        itemCount;

    const cartLink = getElement(".header__cart");
    const cartIcon = cartLink?.querySelector(".icon");

    cartLink?.classList.toggle(
        "has-items",
        itemCount > 0
    );

    if (cartIcon) {
        cartIcon.src = `./assets/icons/${
            itemCount > 0
                ? "shopping-bag-filled"
                : "shopping-bag"
        }.svg`;
    }


    if (itemCount > 0) {

        counter.style.display =
            "block";

    } else {

        counter.style.display =
            "none";

    }

}


/* ==========================================================
   Scroll State
========================================================== */

function initializeHeaderScrollState(header) {

    let frame = null;
    let lastScrollPosition = window.scrollY;

    const updateState = () => {

        const scrollPosition = Math.max(window.scrollY, 0);
        const scrollDifference =
            scrollPosition - lastScrollPosition;

        if (document.body.classList.contains("home-page")) {

            const hero = getElement("#hero .hero");
            const themeColor = document.querySelector(
                'meta[name="theme-color"]'
            );

            if (hero) {

                const heroBottom =
                    hero.getBoundingClientRect().bottom;

                const isPastHero =
                    heroBottom <= header.offsetHeight;

                header.classList.toggle(
                    "is-past-hero",
                    isPastHero
                );

                themeColor?.setAttribute(
                    "content",
                    isPastHero ? "#F5F1EA" : "#303031"
                );

            }

        }

        if (scrollPosition <= header.offsetHeight) {

            header.classList.remove("is-hidden");

        } else if (scrollDifference > 4) {

            header.classList.add("is-hidden");

        } else if (scrollDifference < -4) {

            header.classList.remove("is-hidden");

        }

        if (Math.abs(scrollDifference) > 4) {
            lastScrollPosition = scrollPosition;
        }

    };

    const requestUpdate = () => {

        if (frame) cancelAnimationFrame(frame);

        frame = requestAnimationFrame(updateState);

    };

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestUpdate
    );

    requestUpdate();

}
