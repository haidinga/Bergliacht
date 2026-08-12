/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";

import {
    getElement,
    setHTML
} from "../utils/dom.js";

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

import {
    WEB3FORMS_ACCESS_KEY
} from "../config/web3forms.js";


/* ==========================================================
   Cart State
========================================================== */

const CART_KEY = "bergliachtCart";


/* ==========================================================
   Initialize Cart
========================================================== */

export async function initCartPage() {

    try {

        const data = await loadData();


        /* ==================================================
           Header
        ================================================== */

        renderHeader(data.settings);


        /* ==================================================
           Footer
        ================================================== */

        renderFooter(data.settings);


        /* ==================================================
           Cart
        ================================================== */

        const section =
            getElement("#cart");


        if (!section) {

            console.warn(
                "⚠️ #cart wurde nicht gefunden."
            );

            return;

        }


        renderCart(
            section,
            data
        );


    } catch (error) {

        console.error(
            "❌ Fehler beim Laden des Warenkorbs:",
            error
        );

    }

}


/* ==========================================================
   Render Cart
========================================================== */

function renderCart(
    section,
    data
) {

    const cart =
        JSON.parse(
            localStorage.getItem(
                CART_KEY
            )
        ) || [];


    /* ======================================================
       Empty Cart
    ====================================================== */

    if (cart.length === 0) {

        setHTML(section, `

            <div class="container">

                <div class="cart cart--empty">

                    <h1 class="cart__title">
                        Dein Warenkorb
                    </h1>

                    <p class="cart__empty-text">
                        Dein Warenkorb ist momentan leer.
                    </p>

                    <a
                        class="cart__continue"
                        href="index.html"
                    >
                        Weiter einkaufen
                    </a>

                </div>

            </div>

        `);

        return;

    }


    /* ======================================================
       Resolve Products
    ====================================================== */

    const items = cart
        .map((item) => {

            const product =
                data.products.find(
                    (product) =>
                        product.id === item.productId
                );


            return {

                ...item,

                product

            };

        })
        .filter(
            (item) =>
                item.product
        );


    /* ======================================================
       Calculate Subtotal
    ====================================================== */

    const subtotal =
        items.reduce(
            (total, item) => {

                return total +
                    (
                        item.price *
                        item.quantity
                    );

            },
            0
        );


    /* ======================================================
       Render
    ====================================================== */

    setHTML(section, `

        <div class="container">

            <div class="cart">

                <h1 class="cart__title">
                    Deine Bestellung
                </h1>


                <div class="cart__content">

                    <div class="cart__items">

                        ${items
                            .map(createCartItem)
                            .join("")
                        }

                    </div>


                    <aside class="cart__summary">

                        <div class="cart__summary-row">

                            <span>
                                Zwischensumme
                            </span>

                            <span>
                                ${formatPrice(subtotal)}
                            </span>

                        </div>


                        <div class="cart__summary-row">

                            <span>
                                Lieferung
                            </span>

                            <span>
                                Kostenlos
                            </span>


                        </div>


                        <div class="cart__summary-total">

                            <span>
                                Gesamt
                            </span>

                            <strong>
                                ${formatPrice(subtotal)}
                            </strong>

                        </div>


                        <div class="cart__request">

                            <div class="cart__request-header">

                                <h2 class="cart__request-title">
                                    Bestellanfrage
                                </h2>

                                <p class="cart__request-text">
                                    Fülle kurz die folgenden Angaben aus. Deine Bestellung wird anschließend direkt an Patrick gesendet.
                                </p>

                            </div>


                            <div class="cart__field">

                                <label
                                    class="cart__label"
                                    for="business-name"
                                >
                                    Geschäft
                                    <span>*</span>
                                </label>

                                <input
                                    id="business-name"
                                    class="cart__input"
                                    type="text"
                                    name="business"
                                    placeholder="Name deines Geschäfts"
                                    autocomplete="organization"
                                    required
                                >

                            </div>


                            <div class="cart__field">

                                <label
                                    class="cart__label"
                                    for="order-note"
                                >
                                    Notiz
                                    <span class="cart__optional">
                                        optional
                                    </span>
                                </label>

                                <textarea
                                    id="order-note"
                                    class="cart__textarea"
                                    name="note"
                                    rows="4"
                                    placeholder="z. B. gewünschter Liefertermin, Sonderwünsche ..."
                                ></textarea>

                            </div>


                            <button
                                id="send-order-button"
                                class="cart__checkout"
                                type="button"
                            >
                                An Patrick senden
                            </button>


                            <p
                                id="order-status"
                                class="cart__status"
                                aria-live="polite"
                            ></p>

                        </div>

                    </aside>

                </div>

            </div>

        </div>

    `);


    initializeCartInteractions(
        section,
        data
    );


    initializeOrderRequest(
        section,
        items,
        subtotal
    );

}


/* ==========================================================
   Cart Item
========================================================== */

function createCartItem(item) {

    const product =
        item.product;


    /* ======================================================
       Color Image
    ====================================================== */

    const image =
        `${product.media.folder}${item.colorId}.webp`;


    const total =
        item.price *
        item.quantity;


    return `

        <article
            class="cart-item"
            data-product-id="${item.productId}"
            data-variant-id="${item.variantId}"
            data-color-id="${item.colorId}"
        >

            <div class="cart-item__image">

                <img
                    src="${image}"
                    alt="${product.content.name} – ${item.colorName}"
                >

            </div>


            <div class="cart-item__info">

                <h2 class="cart-item__title">
                    ${product.content.name}
                </h2>

                <p class="cart-item__variant">
                    Größe: ${item.variantLabel}
                </p>

                <p class="cart-item__color">
                    Farbe: ${item.colorName}
                </p>

                <button
                    class="cart-item__remove"
                    type="button"
                >
                    Entfernen
                </button>

            </div>


            <div class="cart-item__quantity">

                <button
                    class="cart-item__quantity-button"
                    type="button"
                    data-action="decrease"
                    aria-label="Menge verringern"
                >
                    −
                </button>

                <span
                    class="cart-item__quantity-value"
                >
                    ${item.quantity}
                </span>

                <button
                    class="cart-item__quantity-button"
                    type="button"
                    data-action="increase"
                    aria-label="Menge erhöhen"
                >
                    +
                </button>

            </div>


            <div class="cart-item__price">

                ${formatPrice(total)}

            </div>

        </article>

    `;

}


/* ==========================================================
   Initialize Order Request
========================================================== */

function initializeOrderRequest(
    section,
    items,
    subtotal
) {

    const button =
        section.querySelector(
            "#send-order-button"
        );


    const businessInput =
        section.querySelector(
            "#business-name"
        );


    const noteInput =
        section.querySelector(
            "#order-note"
        );


    const status =
        section.querySelector(
            "#order-status"
        );


    if (
        !button ||
        !businessInput ||
        !noteInput ||
        !status
    ) {

        return;

    }


    button.addEventListener(
        "click",
        async () => {

            /* ==============================================
               Validate Business
            ============================================== */

            const businessName =
                businessInput.value.trim();


            if (!businessName) {

                businessInput.focus();

                businessInput.classList.add(
                    "is-error"
                );

                status.textContent =
                    "Bitte gib den Namen deines Geschäfts ein.";

                status.className =
                    "cart__status cart__status--error";

                return;

            }


            businessInput.classList.remove(
                "is-error"
            );


            /* ==============================================
               Prepare Order
            ============================================== */

            const note =
                noteInput.value.trim();


            const orderMessage =
                createOrderMessage(
                    businessName,
                    note,
                    items,
                    subtotal
                );


            /* ==============================================
               Button State
            ============================================== */

            button.disabled = true;

            button.textContent =
                "Wird gesendet …";


            status.textContent = "";

            status.className =
                "cart__status";


            /* ==============================================
               Web3Forms
            ============================================== */

            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    access_key:
                                        WEB3FORMS_ACCESS_KEY,

                                    subject:
                                        `Neue B2B-Bestellanfrage – ${businessName}`,

                                    from_name:
                                        businessName,

                                    message:
                                        orderMessage

                                })
                        }
                    );


                const result =
                    await response.json();


                if (
                    !response.ok ||
                    !result.success
                ) {

                    throw new Error(
                        result.message ||
                        "Die Anfrage konnte nicht gesendet werden."
                    );

                }


                /* ==========================================
                   Success
                ========================================== */

                localStorage.removeItem(
                    CART_KEY
                );


                document.dispatchEvent(
                    new CustomEvent(
                        "cartUpdated",
                        {
                            detail: {
                                cart: []
                            }
                        }
                    )
                );


                setHTML(
                    section,
                    `

                    <div class="container">

                        <div class="cart cart--success">

                            <div class="cart__success-icon">
                                ✓
                            </div>

                            <h1 class="cart__title">
                                Bestellung erfolgreich gesendet
                            </h1>

                            <p class="cart__success-text">
                                Deine Bestellung wurde erfolgreich an Patrick gesendet.
                            </p>

                            <p class="cart__success-subtext">
                                Vielen Dank! Ich melde mich wegen der Bestellung bei dir.
                            </p>

                            <a
                                class="cart__continue"
                                href="index.html"
                            >
                                Weiter einkaufen
                            </a>

                        </div>

                    </div>

                    `
                );


            } catch (error) {

                console.error(
                    "❌ Fehler beim Senden der Bestellung:",
                    error
                );


                button.disabled = false;

                button.textContent =
                    "An Patrick senden";


                status.textContent =
                    "Die Anfrage konnte leider nicht gesendet werden. Bitte versuche es erneut.";

                status.className =
                    "cart__status cart__status--error";

            }

        }
    );

}

/* ==========================================================
   Generate Order Number
========================================================== */

function generateOrderNumber() {

    const year =
        new Date().getFullYear();


    const storageKey =
        "bergliachtOrderNumber";


    let number =
        Number(
            localStorage.getItem(
                storageKey
            )
        ) || 0;


    number += 1;


    localStorage.setItem(
        storageKey,
        number
    );


    return `BL-${year}-${String(number).padStart(3, "0")}`;

}

/* ==========================================================
   Create Order Message
========================================================== */

function createOrderMessage(
    businessName,
    note,
    items,
    subtotal
) {

    const orderNumber =
        generateOrderNumber();


    const orderDate =
        new Date().toLocaleDateString(
            "de-AT",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    const productLines =
        items
            .map(
                (item) => {

                    const product =
                        item.product;


                    const itemTotal =
                        item.price *
                        item.quantity;


                    return [

                        product.content.name,

                        `Farbe: ${item.colorName}`,

                        `Größe: ${item.variantLabel}`,

                        `Menge: ${item.quantity}`,

                        `Einzelpreis: ${formatPrice(item.price)}`,

                        `Gesamt: ${formatPrice(itemTotal)}`

                    ].join("\n");

                }
            )
            .join(
                "\n\n"
            );


    return [

        "BESTELLUNG",

        "────────────────────────",

        "",

        `Bestellnummer: ${orderNumber}`,

        `Datum: ${orderDate}`,

        "",

        `Geschäft: ${businessName}`,

        "",

        "────────────────────────",

        "PRODUKTE",

        "────────────────────────",

        "",

        productLines,

        "",

        "────────────────────────",

        `Gesamt: ${formatPrice(subtotal)}`,

        "────────────────────────",

        "",

        "NOTIZ",

        "",

        note || "Keine Notiz angegeben."

    ].join("\n");

}

/* ==========================================================
   Cart Interactions
========================================================== */

function initializeCartInteractions(
    section,
    data
) {

    const items =
        section.querySelectorAll(
            ".cart-item"
        );


    items.forEach(
        (itemElement) => {

            const productId =
                itemElement.dataset.productId;

            const variantId =
                itemElement.dataset.variantId;

            const colorId =
                itemElement.dataset.colorId;


            /* ==============================================
               Remove
            ============================================== */

            const removeButton =
                itemElement.querySelector(
                    ".cart-item__remove"
                );


            if (removeButton) {

                removeButton.addEventListener(
                    "click",
                    () => {

                        updateCart(
                            (cart) => {

                                return cart.filter(
                                    (item) =>
                                        !(
                                            item.productId === productId &&
                                            item.variantId === variantId &&
                                            item.colorId === colorId
                                        )
                                );

                            }
                        );


                        renderCart(
                            section,
                            data
                        );

                    }
                );

            }


            /* ==============================================
               Quantity
            ============================================== */

            const quantityButtons =
                itemElement.querySelectorAll(
                    ".cart-item__quantity-button"
                );


            quantityButtons.forEach(
                (button) => {

                    button.addEventListener(
                        "click",
                        () => {

                            const action =
                                button.dataset.action;


                            updateCart(
                                (cart) => {

                                    const cartItem =
                                        cart.find(
                                            (item) =>
                                                item.productId === productId &&
                                                item.variantId === variantId &&
                                                item.colorId === colorId
                                        );


                                    if (!cartItem) {

                                        return cart;

                                    }


                                    if (
                                        action === "increase"
                                    ) {

                                        cartItem.quantity += 1;

                                    }


                                    if (
                                        action === "decrease"
                                    ) {

                                        cartItem.quantity -= 1;


                                        if (
                                            cartItem.quantity <= 0
                                        ) {

                                            return cart.filter(
                                                (item) =>
                                                    item !== cartItem
                                            );

                                        }

                                    }


                                    return cart;

                                }
                            );


                            renderCart(
                                section,
                                data
                            );

                        }
                    );

                }
            );

        }
    );

}


/* ==========================================================
   Update Cart
========================================================== */

function updateCart(callback) {

    const cart =
        JSON.parse(
            localStorage.getItem(
                CART_KEY
            )
        ) || [];


    const updatedCart =
        callback(cart);


    localStorage.setItem(
        CART_KEY,
        JSON.stringify(
            updatedCart
        )
    );


    document.dispatchEvent(
        new CustomEvent(
            "cartUpdated",
            {
                detail: {
                    cart: updatedCart
                }
            }
        )
    );

}


/* ==========================================================
   Format Price
========================================================== */

function formatPrice(value) {

    return `${value
        .toFixed(2)
        .replace(".", ",")} €`;

}