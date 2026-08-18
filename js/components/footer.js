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

                        <div class="footer__column">

                            <h3 class="footer__heading">

                                Navigation

                            </h3>

                            <nav class="footer__nav">

                                <a href="index.html#hero">Startseite</a>

                                <a href="index.html#products">Produkte</a>

                                <a href="index.html#collections">Kollektionen</a>

                                <a href="about.html">Über uns</a>

                                <a href="about.html#contact">Kontakt</a>

                            </nav>

                        </div>

                        <div class="footer__column">

                            <h3 class="footer__heading">

                                Service

                            </h3>

                            <nav class="footer__nav">

                                <a href="#">Versand</a>

                                <a href="#">FAQ</a>

                                <a href="#">Datenschutz</a>

                                <a href="#">Impressum</a>

                            </nav>

                        </div>

                        <div class="footer__column">

                            <h3 class="footer__heading">

                                Kontakt

                            </h3>

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

                        © ${new Date().getFullYear()} ${settings.shop.name}

                    </p>

                </div>

                <div class="footer__signature">

                    <div class="footer__signature-divider"></div>

                    <h2 class="footer__signature-title">

                        Weniger Dinge.<br>
                        Mehr Zuhause.

                    </h2>

                    <p class="footer__signature-text">

                        Made in Tirol · Mit Liebe gestaltet

                    </p>

                </div>

            </footer>

        </div>

    `);

    renderScrollToTop();

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
