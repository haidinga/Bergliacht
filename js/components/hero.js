/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";

/* ==========================================================
   Hero
========================================================== */

/**
 * Rendert den Hero-Bereich.
 *
 * @param {Object} settings
 */
export function renderHero(settings) {

    const hero = getElement("#hero");

    if (!hero) return;

    setHTML(hero, `

        <div class="container">

            <section class="hero">

                <img
                    class="hero__image"
                    src="./assets/images/hero/hero.webp"
                    alt="${settings.shop.name}"
                    loading="eager"
                >

                <div class="hero__overlay">

                    <div class="hero__content">

                        <h1 class="hero__title">

                            Zeitlose Wohnaccessoires<br>
                            aus dem 3D-Druck.

                        </h1>

                        <p class="hero__subtitle">

                            MINIMALISTISCH. NACHHALTIG. BESONDERS.

                        </p>

                        <div class="hero__actions">

                            <a
                                class="hero__button hero__button--primary"
                                href="#products"
                            >

                                Produkte

                            </a>

                            <a
                                class="hero__button hero__button--secondary"
                                href="#collections"
                            >

                                Kollektionen

                            </a>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    `);

}