/* ==========================================================
   DOM Utilities
========================================================== */

/**
 * Gibt das erste passende Element zurück.
 *
 * @param {string} selector
 * @param {ParentNode} [parent=document]
 * @returns {HTMLElement|null}
 */
export function getElement(selector, parent = document) {
    
    return parent.querySelector(selector);

    const element = parent.querySelector(selector);

    if (!element) {

        console.error(`❌ Element nicht gefunden: ${selector}`);

    }

    return element;

}

/**
 * Gibt alle passenden Elemente zurück.
 *
 * @param {string} selector
 * @param {ParentNode} [parent=document]
 * @returns {NodeListOf<HTMLElement>}
 */
export function getElements(selector, parent = document) {

    return parent.querySelectorAll(selector);

}

/**
 * Ersetzt den HTML-Inhalt eines Elements.
 *
 * @param {HTMLElement|null} element
 * @param {string} html
 */
export function setHTML(element, html) {

    if (!element) return;

    element.innerHTML = html;

}

/**
 * Fügt HTML am Ende eines Elements ein.
 *
 * @param {HTMLElement|null} element
 * @param {string} html
 */
export function appendHTML(element, html) {

    if (!element) return;

    element.insertAdjacentHTML("beforeend", html);

}

/**
 * Fügt eine CSS-Klasse hinzu.
 *
 * @param {HTMLElement|null} element
 * @param {string} className
 */
export function addClass(element, className) {

    if (!element) return;

    element.classList.add(className);

}

/**
 * Entfernt eine CSS-Klasse.
 *
 * @param {HTMLElement|null} element
 * @param {string} className
 */
export function removeClass(element, className) {

    if (!element) return;

    element.classList.remove(className);

}

/**
 * Schaltet eine CSS-Klasse um.
 *
 * @param {HTMLElement|null} element
 * @param {string} className
 */
export function toggleClass(element, className) {

    if (!element) return;

    element.classList.toggle(className);

}

/**
 * Prüft, ob ein Element eine CSS-Klasse besitzt.
 *
 * @param {HTMLElement|null} element
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(element, className) {

    if (!element) return false;

    return element.classList.contains(className);

}