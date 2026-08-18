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
            <h2 id="mobile-menu-title" class="mobile-menu__title">
                Menü
            </h2>

            <nav
                class="mobile-menu__navigation"
                aria-label="Mobile Hauptnavigation"
            >
                <a href="vasen.html">
                    <span>VASEN</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="schriftzuege.html">
                    <span>SCHRIFTZÜGE</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="dekoschalen.html">
                    <span>DEKOSCHALEN</span>
                    ${createIcon("arrow-right")}
                </a>

                <a href="index.html#collections">
                    <span>INSPIRATION</span>
                    ${createIcon("arrow-right")}
                </a>
            </nav>

            <div class="mobile-menu__secondary">
                <a href="about.html">Über uns</a>
                <a href="index.html#footer">Service</a>
            </div>
        </div>
    `;

    document.body.append(overlay);

    const triggerIcon = trigger.querySelector(".menu-toggle-icon");
    const header = document.querySelector("#header");
    let closeTimer = null;

    const updateTrigger = (isOpen) => {
        trigger.setAttribute("aria-expanded", String(isOpen));
        trigger.setAttribute(
            "aria-label",
            isOpen ? "Menü schließen" : "Menü öffnen"
        );

        triggerIcon?.classList.toggle("is-active", isOpen);
    };

    const open = () => {
        window.clearTimeout(closeTimer);
        header?.classList.remove("is-hidden");
        header?.classList.add("menu-is-open");
        const headerHeight = `${header?.offsetHeight ?? 80}px`;

        overlay.style.setProperty("--menu-header-height", headerHeight);
        document.body.style.setProperty("--menu-header-height", headerHeight);
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("mobile-menu-is-open");
        updateTrigger(true);
    };

    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        updateTrigger(false);
        trigger.focus();

        closeTimer = window.setTimeout(() => {
            document.body.classList.remove("mobile-menu-is-open");
            document.body.style.removeProperty("--menu-header-height");
            header?.classList.remove("menu-is-open");
        }, 500);
    };

    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", () => {
        overlay.classList.contains("is-open") ? close() : open();
    });

    overlay.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", close);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            close();
        }
    });

}
