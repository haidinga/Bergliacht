/* ==========================================================
   Imports
========================================================== */

import {
    getElement,
    setHTML
} from "../utils/dom.js";

import {
    highlightVariantSelection
} from "./variant-selector.js";

import {
    highlightColorSelection
} from "./color-selector.js";


/* ==========================================================
   Add To Cart
========================================================== */

export function renderAddToCart(product) {

    const section = getElement("#add-to-cart");

    if (!section) return;


    setHTML(section, `

        <div class="add-to-cart">

            <button
                id="add-to-cart-button"
                class="add-to-cart__button"
                type="button"
            >
                In den Warenkorb
            </button>

            <p class="add-to-cart__hint">
                Individuell für dich gefertigt.
            </p>

        </div>

    `);


    /* ======================================================
       Elements
    ====================================================== */

    const button = getElement(
        "#add-to-cart-button"
    );

    if (!button) return;


    /* ======================================================
       Selection State
    ====================================================== */

    let selectedVariant = null;

    let selectedColor = null;

    let quantity = 1;


    /* ======================================================
       Variant Changed
    ====================================================== */

    document.addEventListener(
        "variantChanged",
        (event) => {

            selectedVariant =
                event.detail;

        }
    );


    /* ======================================================
       Color Changed
    ====================================================== */

    document.addEventListener(
        "colorChanged",
        (event) => {

            selectedColor =
                event.detail;

        }
    );


    /* ======================================================
       Quantity Changed
    ====================================================== */

    document.addEventListener(
        "quantityChanged",
        (event) => {

            quantity =
                Number(
                    event.detail.quantity
                );

        }
    );


    /* ======================================================
       Add To Cart
    ====================================================== */

    button.addEventListener(
        "click",
        () => {

            /* ------------------------------------------
               Validate Required Selections
            ------------------------------------------ */

            const variantMissing = !selectedVariant;
            const colorMissing = !selectedColor;

            if (variantMissing) {

                highlightVariantSelection();

            }

            if (colorMissing) {

                highlightColorSelection();

            }

            if (variantMissing || colorMissing) return;


            /* ------------------------------------------
               Validate Quantity
            ------------------------------------------ */

            if (
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {

                quantity = 1;

            }


            /* ------------------------------------------
               Load Cart
            ------------------------------------------ */

            let cart = [];

            try {

                cart =
                    JSON.parse(
                        localStorage.getItem(
                            "bergliachtCart"
                        )
                    ) || [];

            } catch (error) {

                console.warn(
                    "⚠️ Warenkorb konnte nicht gelesen werden. Neuer Warenkorb wird erstellt."
                );

                cart = [];

            }


            /* ------------------------------------------
               Product ID
            ------------------------------------------ */

            const productId =
                product.id;


            /* ------------------------------------------
               Existing Item
            ------------------------------------------ */

            const existingItem =
                cart.find(
                    (item) =>
                        item.productId === productId &&
                        item.variantId === selectedVariant.id &&
                        item.colorId === selectedColor.id
                );


            /* ------------------------------------------
               Existing Item
            ------------------------------------------ */

            if (existingItem) {

                existingItem.quantity += quantity;

            }


            /* ------------------------------------------
               New Item
            ------------------------------------------ */

            else {

                cart.push({

                    productId,

                    variantId:
                        selectedVariant.id,

                    variantLabel:
                        selectedVariant.label ??
                        selectedVariant.id,

                    price:
                        Number(
                            selectedVariant.price
                        ),

                    colorId:
                        selectedColor.id,

                    colorName:
                        selectedColor.name,

                    quantity

                });

            }


            /* ------------------------------------------
               Save Cart
            ------------------------------------------ */

            localStorage.setItem(
                "bergliachtCart",
                JSON.stringify(cart)
            );


            /* ------------------------------------------
               Cart Event
            ------------------------------------------ */

            document.dispatchEvent(
                new CustomEvent(
                    "addToCart",
                    {
                        detail: {

                            productId,

                            variantId:
                                selectedVariant.id,

                            colorId:
                                selectedColor.id,

                            quantity

                        }
                    }
                )
            );


            /* ------------------------------------------
               Visual Feedback
            ------------------------------------------ */

            const originalText =
                button.textContent;

            button.textContent =
                "Zum Warenkorb hinzugefügt ✓";

            button.disabled = true;


            setTimeout(() => {

                button.textContent =
                    originalText;

                button.disabled = false;

            }, 1500);


            console.log(
                "✅ Produkt zum Warenkorb hinzugefügt:",
                cart
            );

        }
    );

}
