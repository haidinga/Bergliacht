/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";
import { getElement, setHTML } from "../utils/dom.js";


/* ==========================================================
   Header
========================================================== */

/**
 * Rendert den Header.
 *
 * @param {Object} settings
 */
export function renderHeader(settings) {

    const header = getElement("#header");

    if (!header) return;


    setHTML(header, `

        <div class="container">

            <header class="header">

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
                        href="index.html#hero"
                    >
                        Startseite
                    </a>

                    <a
                        class="header__link"
                        href="index.html#products"
                    >
                        Produkte
                    </a>

                    <a
                        class="header__link"
                        href="index.html#collections"
                    >
                        Kollektionen
                    </a>

                    <a
                        class="header__link"
                        href="index.html#about"
                    >
                        Über uns
                    </a>

                    <a
                        class="header__link"
                        href="index.html#contact"
                    >
                        Kontakt
                    </a>

                </nav>


                <div class="header__actions">

                    <button
                        class="header__icon"
                        type="button"
                        aria-label="Suche"
                    >

                        ${createIcon("search")}

                    </button>


                    <button
                        class="header__icon"
                        type="button"
                        aria-label="Favoriten"
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


    if (itemCount > 0) {

        counter.style.display =
            "flex";

    } else {

        counter.style.display =
            "none";

    }

}