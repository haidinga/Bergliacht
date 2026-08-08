/* ==========================================================
   Data Loader
========================================================== */

/**
 * Lädt alle Daten des Shops.
 *
 * @returns {Promise<Object>}
 */
export async function loadData() {

    const [

        settings,
        collections,
        products,
        colors

    ] = await Promise.all([

        fetch("./data/settings.json").then((response) => response.json()),

        fetch("./data/collections.json").then((response) => response.json()),

        fetch("./data/products.json").then((response) => response.json()),

        fetch("./data/colors.json").then((response) => response.json())

    ]);

    console.log("settings.json:", settings);
    console.log("collections.json:", collections);
    console.log("products.json =", JSON.stringify(products, null, 2));
    console.log("colors.json:", colors);

    return {

        settings,

        collections: collections.data,

        products: products.data,

        colors: colors.data

    };

}