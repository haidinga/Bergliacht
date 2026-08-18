/* ==========================================================
   Imports
========================================================== */

import {
    getElement,
    setHTML,
    addClass,
    removeClass
} from "../utils/dom.js";

import { renderScrollToTop } from "./scroll-to-top.js";

/* ==========================================================
   Footer
========================================================== */

/**
 * Rendert den Footer.
 *
 * @param {Object} settings
 */
export function renderFooter(settings) {

    const footer = getElement("#footer");

    if (!footer) return;

    setHTML(footer, `

        <div class="container">

            <footer class="footer">

                <div class="footer__top">

                    <a
                        class="footer__brand"
                        href="index.html"
                        aria-label="${settings.shop.name}"
                    >

                        <img
                            class="footer__logo"
                            src="${settings.branding.logo}"
                            alt="${settings.shop.name}"
                        >

                    </a>

                    <div class="footer__grid">

                        <div class="footer__column" data-footer-accordion>

                            <button
                                class="footer__heading"
                                type="button"
                                aria-expanded="false"
                            >
                                <span>Navigation</span>
                                <span class="footer__heading-icon" aria-hidden="true">+</span>
                            </button>

                            <div class="footer__column-content">
                                <nav class="footer__nav">
                                    <a href="index.html#hero">Startseite</a>
                                    <a href="collections.html">Kollektionen</a>
                                    <a href="about.html">Über uns</a>
                                </nav>
                            </div>

                        </div>

                        <div class="footer__column" data-footer-accordion>

                            <button
                                class="footer__heading"
                                type="button"
                                aria-expanded="false"
                            >
                                <span>Service</span>
                                <span class="footer__heading-icon" aria-hidden="true">+</span>
                            </button>

                            <div class="footer__column-content">
                                <nav class="footer__nav">
                                    <a href="#">Versand</a>
                                    <a href="#">FAQ</a>
                                    <a href="#">Datenschutz</a>
                                    <a href="#">Impressum</a>
                                </nav>
                            </div>

                        </div>

                        <div class="footer__column" data-footer-accordion>

                            <button
                                class="footer__heading"
                                type="button"
                                aria-expanded="false"
                            >
                                <span>Shop</span>
                                <span class="footer__heading-icon" aria-hidden="true">+</span>
                            </button>

                            <div class="footer__column-content">
                                <nav class="footer__nav">
                                    <a href="vasen.html">Vasen</a>
                                    <a href="schriftzuege.html">Schriftzüge</a>
                                    <a href="dekoschalen.html">Dekoschalen</a>
                                </nav>
                            </div>

                        </div>

                        <div class="footer__column footer__column--contact">

                            <div class="footer__heading footer__heading--static">

                                Kontakt

                            </div>

                            <div class="footer__contact">

                                <p>

                                    hello@bergliacht.at

                                </p>

                                <p>

                                    Tirol, Österreich

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="footer__bottom">

                    <p>

                        © ${new Date().getFullYear()} · ${settings.shop.name.toUpperCase()} · Tirol · Austria

                    </p>

                </div>

                <div class="footer__signature">

                    <div class="footer__signature-divider"></div>

                    <h2 class="footer__signature-title">

                        Weniger Dinge.<br>
                        Mehr Zuhause.

                    </h2>

                    <p class="footer__signature-text">

                        <span>Made in Tirol</span>
                        <span>Mit Liebe gestaltet</span>

                    </p>

                </div>

            </footer>

        </div>

    `);

    renderScrollToTop();

    initializeFooterAccordions(footer);

    /* ======================================================
       Signature Animation
    ====================================================== */

    const signature = getElement(".footer__signature", footer);

    if (!signature) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                addClass(signature, "is-visible");

            } else {

                removeClass(signature, "is-visible");

            }

        });

    }, {

        threshold: 0.35

    });

    observer.observe(signature);

}


/* ==========================================================
   Mobile Footer Accordions
========================================================== */

function initializeFooterAccordions(footer) {

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const columns = [...footer.querySelectorAll("[data-footer-accordion]")];

    columns.forEach((column) => {

        const button = column.querySelector(".footer__heading");

        button?.addEventListener("click", () => {

            if (!mobileQuery.matches) return;

            const isOpen = column.classList.toggle("is-open");

            button.setAttribute("aria-expanded", String(isOpen));

        });

    });

    mobileQuery.addEventListener?.("change", () => {

        columns.forEach((column) => {

            column.classList.remove("is-open");
            column.querySelector(".footer__heading")
                ?.setAttribute("aria-expanded", "false");

        });

    });

}
