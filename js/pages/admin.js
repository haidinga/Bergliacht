/* ==========================================================
   Imports
========================================================== */

import { loadData } from "../core/loader.js";

import {
    getElement,
    setHTML
} from "../utils/dom.js";


/* ==========================================================
   State
========================================================== */

let adminData = null;

let variantCounter = 0;


/* ==========================================================
   Initialize Admin
========================================================== */

async function initAdminPage() {

    try {

        adminData =
            await loadData();


        renderProducts(
            adminData.products
        );


        renderColors(
            adminData.colors
        );

        initializeSelectAllColors();

        initializeNewProductButton();

        initializeProductForm();

        initializeCancelButtons();

        initializeVariantButton();

        initializeAutoSlug();


    } catch (error) {

        console.error(
            "❌ Fehler beim Laden des Admin-Bereichs:",
            error
        );


        const list =
            getElement("#product-list");


        if (list) {

            setHTML(
                list,
                `
                <p class="admin__error">
                    Die Produkte konnten nicht geladen werden.
                </p>
                `
            );

        }

    }

}


/* ==========================================================
   Render Products
========================================================== */

function renderProducts(
    products
) {

    const list =
        getElement("#product-list");


    const count =
        getElement("#product-count");


    if (!list) return;


    if (count) {

        count.textContent =
            `${products.length} ${
                products.length === 1
                    ? "Produkt"
                    : "Produkte"
            }`;

    }


    if (!products.length) {

        setHTML(
            list,
            `
            <div class="admin__empty">

                <h3>
                    Noch keine Produkte
                </h3>

                <p>
                    Erstelle dein erstes Produkt.
                </p>

            </div>
            `
        );

        return;

    }


    setHTML(
        list,

        products
            .map(
                (product) =>
                    createProductCard(
                        product
                    )
            )
            .join("")
    );

}


/* ==========================================================
   Product Card
========================================================== */

function createProductCard(
    product
) {

    const image =
        `${product.media.folder}${product.media.thumbnail}`;


    const variantCount =
        product.variants?.length || 0;


    const colorCount =
        product.colors?.length || 0;


    return `

        <article
            class="admin-product"
            data-product-id="${product.id}"
        >

            <div class="admin-product__image">

                <img
                    src="${image}"
                    alt="${product.content.name}"
                >

            </div>


            <div class="admin-product__content">

                <div class="admin-product__top">

                    <div>

                        <p class="admin-product__category">
                            ${product.classification.category}
                        </p>

                        <h3 class="admin-product__name">
                            ${product.content.name}
                        </h3>

                    </div>


                    <span
                        class="admin-product__status ${
                            product.active
                                ? "is-active"
                                : "is-inactive"
                        }"
                    >
                        ${
                            product.active
                                ? "Aktiv"
                                : "Inaktiv"
                        }
                    </span>

                </div>


                <p class="admin-product__description">

                    ${
                        product.content.shortDescription ||
                        "Keine Kurzbeschreibung vorhanden."
                    }

                </p>


                <div class="admin-product__meta">

                    <span>
                        ${variantCount}
                        ${
                            variantCount === 1
                                ? " Größe"
                                : " Größen"
                        }
                    </span>

                    <span>
                        ${colorCount}
                        ${
                            colorCount === 1
                                ? " Farbe"
                                : " Farben"
                        }
                    </span>

                </div>


                <div class="admin-product__actions">

                    <button
                        class="admin__secondary-button"
                        type="button"
                    >
                        Bearbeiten
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* ==========================================================
   Render Colors
========================================================== */

function renderColors(
    colors
) {

    const container =
        getElement(
            "#color-list"
        );


    if (!container) return;


    if (!colors || !colors.length) {

        setHTML(
            container,
            `
            <p class="admin__error">
                Keine Farben gefunden.
            </p>
            `
        );

        return;

    }



    setHTML(
        container,

        colors
            .map(
                (color) => {

                    const id =
                        typeof color === "string"
                            ? color
                            : color.id;


                    const name =
                        typeof color === "string"
                            ? formatColorName(color)
                            : (
                                color.name ||
                                color.label ||
                                formatColorName(color.id)
                            );


                    return `

                        <label class="admin-color">

                            <input
                                type="checkbox"
                                name="colors"
                                value="${id}"
                            >

                            <span class="admin-color__label">
                                ${name}
                            </span>

                        </label>

                    `;

                }
            )
            .join("")
    );

}

/* ==========================================================
   Select All Colors
========================================================== */

function initializeSelectAllColors() {

    const button =
        getElement(
            "#select-all-colors"
        );

    const container =
        getElement(
            "#color-list"
        );

    if (
        !button ||
        !container
    ) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            const checkboxes =
                container.querySelectorAll(
                    'input[name="colors"]'
                );

            if (!checkboxes.length) {
                return;
            }

            const allSelected =
                Array.from(
                    checkboxes
                ).every(
                    checkbox =>
                        checkbox.checked
                );

            checkboxes.forEach(
                checkbox => {

                    checkbox.checked =
                        !allSelected;

                }
            );

            button.textContent =
                allSelected
                    ? "Alle auswählen"
                    : "Alle abwählen";

        }
    );

}


/* ==========================================================
   Format Color Name
========================================================== */

function formatColorName(
    value
) {

    return value
        .split("-")
        .map(
            (part) =>
                part.charAt(0).toUpperCase() +
                part.slice(1)
        )
        .join(" ");

}


/* ==========================================================
   New Product Button
========================================================== */

function initializeNewProductButton() {

    const button =
        getElement(
            "#new-product-button"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            openProductEditor();

        }
    );

}


/* ==========================================================
   Open Product Editor
========================================================== */

function openProductEditor() {

    const overview =
        getElement(
            "#product-overview"
        );


    const editor =
        getElement(
            "#product-editor"
        );


    if (!overview || !editor) return;


    overview.hidden = true;

    editor.hidden = false;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    initializeDefaultVariants();
    initializeDefaultProductTexts();

}

/* ==========================================================
   Default Product Texts
========================================================== */

function initializeDefaultProductTexts() {

    const care =
        getElement(
            "#product-care"
        );

    const manufacturing =
        getElement(
            "#product-manufacturing"
        );

    const material =
        getElement(
            "#product-material"
        );

    const surface =
        getElement(
            "#product-surface"
        );


    if (care) {

        care.value =
            "Mit einem weichen, leicht feuchten Tuch reinigen und anschließend abtrocknen. Nicht in der Spülmaschine reinigen. Keine aggressiven Reinigungs- oder Scheuermittel verwenden. Keiner direkter Hitze oder starker Sonneneinstrahlung aussetzen, da PLA dadurch mit der Zeit verformt oder sich verfärben kann.";

    }


    if (manufacturing) {

        manufacturing.value =
            "Die Vasen sind durch ihr Material nicht wasserdicht und daher nicht für frische Blumen geeignet. Es sollten Trockenblumen verwendet werden.Jede Vase wird in Tirol im 3D-Druckverfahren aus PLA gefertigt. Durch die additive Fertigung kann es zu geringfügigen Abweichungen in Oberfläche, Struktur, Farbe und Form kommen. Dadurch ist jedes Stück ein Unikat.";

    }

    if (material) {

        material.value =
            "PLA (Polylactic Acid) ist ein biologisch abbaubarer Kunststoff, der aus nachwachsenden Rohstoffen wie Maisstärke oder Zuckerrohr hergestellt wird. PLA ist umweltfreundlicher als viele andere Kunststoffe, da es aus erneuerbaren Ressourcen stammt und unter bestimmten Bedingungen kompostierbar ist. Es ist jedoch nicht so hitzebeständig wie einige andere Kunststoffe und kann sich bei hohen Temperaturen verformen, dadurch ist darauf zu achten, dass die Produkte nicht zu lange im Auto in der Sonne stehen.";

    }


    if (surface) {

        surface.value =
            "Kleine sichtbare Druckspuren, minimale Unebenheiten oder feine Linien können entstehen. Sie gehören zum Herstellungsprozess und machen den Charakter eines 3D-gedruckten Produkts aus.";
    }

}


/* ==========================================================
   Close Product Editor
========================================================== */

function closeProductEditor() {

    const overview =
        getElement(
            "#product-overview"
        );


    const editor =
        getElement(
            "#product-editor"
        );


    if (!overview || !editor) return;


    editor.hidden = true;

    overview.hidden = false;


    resetProductForm();

}


/* ==========================================================
   Cancel Buttons
========================================================== */

function initializeCancelButtons() {

    const buttons = [

        getElement(
            "#cancel-product-button"
        ),

        getElement(
            "#cancel-product-button-bottom"
        )

    ];


    buttons.forEach(
        (button) => {

            if (!button) return;


            button.addEventListener(
                "click",
                () => {

                    closeProductEditor();

                }
            );

        }
    );

}


/* ==========================================================
   Variant Button
========================================================== */

function initializeVariantButton() {

    const button =
        getElement(
            "#add-variant-button"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            addVariantRow();

        }
    );

}


/* ==========================================================
   Default Variants
========================================================== */

function initializeDefaultVariants() {

    const container =
        getElement(
            "#variant-list"
        );


    if (!container) return;


    setHTML(
        container,
        ""
    );


    variantCounter = 0;


    addVariantRow(
        "small",
        "120mm",
        24.90
    );


    addVariantRow(
        "medium",
        "180mm",
        34.90
    );


    addVariantRow(
        "large",
        "240mm",
        44.90
    );

}


/* ==========================================================
   Add Variant Row
========================================================== */

function addVariantRow(
    id = "",
    label = "",
    price = ""
) {

    const container =
        getElement(
            "#variant-list"
        );


    if (!container) return;


    variantCounter += 1;


    const rowId =
        `variant-${variantCounter}`;


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "admin-variant";


    row.dataset.variantId =
        rowId;


    row.innerHTML = `

        <div class="admin-form__field">

            <label>
                ID
            </label>

            <input
                type="text"
                data-field="id"
                value="${id}"
                placeholder="small"
            >

        </div>


        <div class="admin-form__field">

            <label>
                Bezeichnung
            </label>

            <input
                type="text"
                data-field="label"
                value="${label}"
                placeholder="120mm"
            >

        </div>


        <div class="admin-form__field">

            <label>
                Höhe
            </label>

            <input
                type="number"
                data-field="height"
                value="${
                    extractHeight(label)
                }"
                placeholder="120"
            >

        </div>


        <div class="admin-form__field">

            <label>
                Preis
            </label>

            <input
                type="number"
                data-field="price"
                value="${price}"
                min="0"
                step="0.01"
                placeholder="24.90"
            >

        </div>


        <button
            class="admin-variant__remove"
            type="button"
            aria-label="Größe entfernen"
        >
            ×
        </button>

    `;


    const removeButton =
        row.querySelector(
            ".admin-variant__remove"
        );


    removeButton.addEventListener(
        "click",
        () => {

            row.remove();

        }
    );


    container.appendChild(
        row
    );

}


/* ==========================================================
   Extract Height
========================================================== */

function extractHeight(
    label
) {

    const match =
        String(label)
            .match(
                /(\d+(?:\.\d+)?)/
            );


    return match
        ? match[1]
        : "";

}


/* ==========================================================
   Auto Slug / Folder
========================================================== */

function initializeAutoSlug() {

    const nameInput =
        getElement(
            "#product-name"
        );


    const folderInput =
        getElement(
            "#product-folder"
        );


    if (
        !nameInput ||
        !folderInput
    ) return;


    nameInput.addEventListener(
        "input",
        () => {

            if (
                folderInput.dataset.manual === "true"
            ) {

                return;

            }


            folderInput.value =
                slugify(
                    nameInput.value
                );

        }
    );


    folderInput.addEventListener(
        "input",
        () => {

            folderInput.dataset.manual =
                "true";

        }
    );

}


/* ==========================================================
   Slugify
========================================================== */

function slugify(
    value
) {

    return value

        .toLowerCase()

        .trim()

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[^a-z0-9]+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""
        );

}


/* ==========================================================
   Product Form
========================================================== */

function initializeProductForm() {

    const form =
        getElement(
            "#product-form"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const product =
                collectProductData();


            console.log(
                "Neues Produkt:",
                product
            );


            showGeneratedProduct(
                product
            );

        }
    );

}


/* ==========================================================
   Collect Product Data
========================================================== */

function collectProductData() {

    const name =
        getValue(
            "#product-name"
        );


    const folder =
        getValue(
            "#product-folder"
        ) ||
        slugify(name);


    const variants =
        collectVariants();


    const colors =
        collectColors();


    return {

        id: folder,

        slug: folder,

        active: true,


        content: {

            name,

            subtitle:
                getValue(
                    "#product-subtitle"
                ),

            shortDescription:
                getValue(
                    "#product-short-description"
                ),

            description:
                getValue(
                    "#product-description"
                )

        },


        classification: {

            category:
                getValue(
                    "#product-category"
                ),

            collection:
                getValue(
                    "#product-collection"
                ),

            featured:
                getChecked(
                    "#product-featured"
                ),

            new:
                getChecked(
                    "#product-new"
                ),

            bestseller:
                getChecked(
                    "#product-bestseller"
                )

        },


        media: {

            folder:
                `./assets/images/products/${folder}/`,

            thumbnail:
                getValue(
                    "#product-thumbnail"
                ) ||
                "thumbnail.webp",

            scene:
                getValue(
                    "#product-scene"
                ) ||
                "scene.webp"

        },


        variants,


        colors,


specifications: {

    material:
        getValue(
            "#product-material"
        ),

    manufacturer:
        getValue(
            "#product-manufacturer"
        ),

    care:
        getValue(
            "#product-care"
        )

},


        notes: {

            manufacturing:
                getValue(
                    "#product-manufacturing"
                ),

            surface:
                getValue(
                    "#product-surface"
                )

        },


        attributes: {

            waterproof:
                getChecked(
                    "#product-waterproof"
                ),

            indoor:
                getChecked(
                    "#product-indoor"
                ),

            outdoor:
                getChecked(
                    "#product-outdoor"
                )

        },


        meta: {

            created:
                new Date().toISOString(),

            updated:
                new Date().toISOString()

        }

    };

}


/* ==========================================================
   Collect Variants
========================================================== */

function collectVariants() {

    const rows =
        document.querySelectorAll(
            ".admin-variant"
        );


    return Array.from(rows)
        .map(
            (row) => {

                const id =
                    row.querySelector(
                        '[data-field="id"]'
                    )?.value.trim();


                const label =
                    row.querySelector(
                        '[data-field="label"]'
                    )?.value.trim();


                const height =
                    Number(
                        row.querySelector(
                            '[data-field="height"]'
                        )?.value
                    );


                const price =
                    Number(
                        row.querySelector(
                            '[data-field="price"]'
                        )?.value
                    );


                return {

                    id,

                    label,

                    height,

                    price

                };

            }
        )
        .filter(
            (variant) =>
                variant.id &&
                variant.label &&
                variant.height &&
                Number.isFinite(
                    variant.price
                )
        );

}


/* ==========================================================
   Collect Colors
========================================================== */

function collectColors() {

    const checked =
        document.querySelectorAll(
            '#color-list input[type="checkbox"]:checked'
        );


    return Array.from(
        checked
    ).map(
        (input) =>
            input.value
    );

}


/* ==========================================================
   Helpers
========================================================== */

function getValue(
    selector
) {

    return (
        getElement(
            selector
        )?.value.trim()
        || ""
    );

}


function getChecked(
    selector
) {

    return Boolean(
        getElement(
            selector
        )?.checked
    );

}


/* ==========================================================
   Show Generated Product
========================================================== */

function showGeneratedProduct(
    product
) {

    const editor =
        getElement(
            "#product-editor"
        );


    if (!editor) return;


    const existing =
        getElement(
            "#generated-product"
        );


    if (existing) {

        existing.remove();

    }


    const result =
        document.createElement(
            "div"
        );


    result.id =
        "generated-product";


    result.className =
        "admin-generated";


    result.innerHTML = `

        <div class="admin-generated__header">

            <div>

                <h3>
                    Produkt erstellt
                </h3>

                <p>
                    Der folgende JSON-Eintrag kann in
                    <strong>data/products.json</strong>
                    übernommen werden.
                </p>

            </div>

        </div>


        <textarea
            class="admin-generated__code"
            readonly
        ></textarea>


        <div class="admin-generated__actions">

            <button
                id="copy-product-json"
                class="admin__primary-button"
                type="button"
            >
                JSON kopieren
            </button>

        </div>

    `;


    const code =
        result.querySelector(
            ".admin-generated__code"
        );


    code.value =
        JSON.stringify(
            product,
            null,
            4
        );


    const copyButton =
        result.querySelector(
            "#copy-product-json"
        );


    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    code.value
                );


                copyButton.textContent =
                    "✓ Kopiert";


                setTimeout(
                    () => {

                        copyButton.textContent =
                            "JSON kopieren";

                    },
                    2000
                );


            } catch (error) {

                console.error(
                    "❌ Kopieren fehlgeschlagen:",
                    error
                );

            }

        }
    );


    editor.appendChild(
        result
    );


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==========================================================
   Reset Form
========================================================== */

function resetProductForm() {

    const form =
        getElement(
            "#product-form"
        );


    if (!form) return;


    form.reset();


    const folder =
        getElement(
            "#product-folder"
        );


    if (folder) {

        folder.value = "";

        folder.dataset.manual =
            "false";

    }


    const generated =
        getElement(
            "#generated-product"
        );


    if (generated) {

        generated.remove();

    }


    initializeDefaultVariants();

}


/* ==========================================================
   Start
========================================================== */

initAdminPage();