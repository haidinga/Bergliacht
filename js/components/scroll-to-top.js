/* ==========================================================
   Imports
========================================================== */

import { createIcon } from "./icon.js";


/* ==========================================================
   Scroll To Top
========================================================== */

export function renderScrollToTop() {

    const existingButton = document.querySelector(
        ".scroll-to-top"
    );

    if (existingButton) return;

    const button = document.createElement("button");

    button.className = "scroll-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "Zurück nach oben");
    button.innerHTML = createIcon("arrow-up");

    document.body.append(button);

    const updateVisibility = () => {

        button.classList.toggle(
            "is-visible",
            window.scrollY > 400
        );

    };

    button.addEventListener("click", () => {

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
        });

    });

    window.addEventListener(
        "scroll",
        updateVisibility,
        { passive: true }
    );

    updateVisibility();

}
