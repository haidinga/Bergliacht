/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";


/* ==========================================================
   Mobile Menu
========================================================== */

export function renderMobileMenu() {

    const trigger = document.querySelector(
        "[data-mobile-menu-trigger]"
    );

    if (!trigger) return;

    document.querySelector(".mobile-menu-overlay")?.remove();

    const overlay = document.createElement("div");

    overlay.className = "mobile-menu-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
        <div
            class="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
        >
            <div class="mobile-menu__header">
                <p id="mobile-menu-title">Menü</p>

                <button
                    class="mobile-menu__close"
                    type="button"
                    aria-label="Menü schließen"
                >
                    ${createIcon("x")}
                </button>
            </div>

            <nav
                class="mobile-menu__navigation"
                aria-label="Mobile Hauptnavigation"
            >
                <a href="vasen.html">
                    <span>Vasen</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="schriftzuege.html">
                    <span>Schriftzüge</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="dekoschalen.html">
                    <span>Dekoschalen</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="index.html#collections">
                    <span>Kollektionen</span>
                    ${createIcon("arrow-right")}
                </a>
            </nav>

            <div class="mobile-menu__secondary">
                <a href="about.html">Über uns</a>
            </div>
        </div>
    `;

    document.body.append(overlay);

    const closeButton = overlay.querySelector(".mobile-menu__close");

    const open = () => {
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("mobile-menu-is-open");
        window.setTimeout(() => closeButton.focus(), 250);
    };

    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("mobile-menu-is-open");
        trigger.focus();
    };

    trigger.addEventListener("click", open);
    closeButton.addEventListener("click", close);

    overlay.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", close);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            close();
        }
    });

}
