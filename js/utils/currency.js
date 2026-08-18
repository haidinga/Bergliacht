/* ==========================================================
   Currency
========================================================== */

const priceFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});


/**
 * Formatiert einen Betrag ohne unnötige Dezimalstellen.
 *
 * @param {number|string} value
 * @returns {string}
 */
export function formatPrice(value) {

    const amount = Number(value);

    if (!Number.isFinite(amount)) return "0 EUR";

    return `${priceFormatter.format(amount)} EUR`;

}
