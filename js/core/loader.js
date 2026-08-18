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
        colors,
        categories

    ] = await Promise.all([

        fetch("./data/settings.json").then((response) => response.json()),

        fetch("./data/collections.json").then((response) => response.json()),

        fetch("./data/products.json").then((response) => response.json()),

        fetch("./data/colors.json").then((response) => response.json()),

        fetch("./data/categories.json").then((response) => response.json())

    ]);

    return {

        settings,

        collections: collections.data,

        products: products.data,

        colors: colors.data,

        categories: categories.data

    };

}
