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
                    href="#hero"
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
                        href="#hero"
                    >
                        Startseite
                    </a>
        
                    <a
                        class="header__link"
                        href="#products"
                    >
                        Produkte
                    </a>

                    <a
                        class="header__link"
                        href="#collections"
                    >
                        Kollektionen
                    </a>

                    <a
                        class="header__link"
                        href="#about"
                    >
                        Über uns
                    </a>

                    <a
                        class="header__link"
                        href="#contact"
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

                    <button
                        class="header__icon"
                        type="button"
                        aria-label="Warenkorb"
                    >

                        ${createIcon("shopping-bag")}

                    </button>

                </div>

            </header>

        </div>

    `);

}