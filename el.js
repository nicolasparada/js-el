/**
 * @param {array} arr
 * @returns {array}
 */
const flatten = arr => arr.reduce((flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item), [])

/**
 * Creates an HTMLElement with the given tag, props and children.
 *
 * @param {string} tagName
 * @param {{}=} props
 * @param {...(string|string[]|Node|Node[])} children
 * @returns {HTMLElement}
 */
export default function el(tagName, props, ...children) {
    const el = document.createElement(tagName)
    if (typeof props === 'object' && props !== null) {
        // @ts-ignore
        for (const [propName, propValue] of Object.entries(props)) {
            if (propName in el) {
                try {
                    el[propName] = propValue
                } catch (_) { }
            } else if (propName === 'ref' && typeof propValue === 'function') {
                propValue(el)
            } else if (propName.startsWith('on') && typeof propValue === 'function') {
                el.addEventListener(propName.substr(2).toLowerCase(), propValue)
            } else if (propValue === true) {
                el.setAttribute(propName, '')
            } else if (propValue !== false && propValue !== undefined && propValue !== null) {
                el.setAttribute(propName, String(propValue))
            }
        }
    }
    if (children.length !== 0) {
        for (const child of flatten(children)) {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child))
            } else if (child instanceof Node) {
                el.appendChild(child)
            }
        }
    }
    return el
}
