/* ==========================================================
   Imports
========================================================== */

import { getElement, setHTML } from "../utils/dom.js";
import { createIcon } from "./icon.js";

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

        <div class="hero">

            <img
                class="hero__image"
                src="./assets/images/hero/hero.jpg"
                alt="Wohnaccessoires von ${settings.shop.name}"
                loading="eager"
            >

            <div class="hero__overlay">

                <div class="container hero__overlay-container">
                    <div class="hero__content">

                        <p class="hero__eyebrow">
                            Zeitlose Wohnaccessoires aus dem 3D-Druck.
                        </p>

                        <h1 class="hero__title">
                            Minimalistisch.<br>
                            Nachhaltig.<br>
                            Besonders.
                        </h1>

                        <p class="hero__subtitle">
                            Designobjekte, die dein Zuhause<br>
                            auf das Wesentliche reduzieren.
                        </p>

                        <div class="hero__actions">

                            <a
                                class="hero__button hero__button--primary"
                                href="#products"
                            >

                                Jetzt entdecken

                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="hero-benefits">
            <div class="container">
                <div class="hero-benefits__grid">
                    <div class="hero-benefit">
                        ${createIcon("shield-check")}
                        <div>
                            <strong>Nachhaltig</strong>
                            <span>Aus PLA gefertigt</span>
                        </div>
                    </div>

                    <div class="hero-benefit">
                        ${createIcon("package")}
                        <div>
                            <strong>3D-Druck</strong>
                            <span>Mit höchster Präzision</span>
                        </div>
                    </div>

                    <div class="hero-benefit">
                        ${createIcon("star")}
                        <div>
                            <strong>Designed in Tirol</strong>
                            <span>Inspiriert von der Natur</span>
                        </div>
                    </div>

                    <div class="hero-benefit">
                        ${createIcon("heart")}
                        <div>
                            <strong>Mit Liebe</strong>
                            <span>Für dein Zuhause</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `);

}
