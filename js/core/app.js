/* ==========================================================
   Imports
========================================================== */

import { initHomePage } from "../pages/home.js";
import { initCartPage } from "../pages/cart.js";


/* ==========================================================
   App
========================================================== */

export async function initApp() {
    const path =
        window.location.pathname;


    /* ======================================================
       Home
    ====================================================== */

    if (
        path.endsWith("/") ||
        path.endsWith("/index.html")
    ) {

        await initHomePage();

        return;

    }


    /* ======================================================
       Cart
    ====================================================== */

    if (
        path.endsWith("/cart.html")
    ) {

        await initCartPage();

        return;

    }

}
