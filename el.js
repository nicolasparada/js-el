/**
 * @param {array} arr
 * @returns {array}
 */
const flatten = arr => arr.reduce((flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item), [])

/**
 * Creates an HTMLElement with the given tag, props and children.
 *
 * @param {string} tagName
 * @param {{[x: string]: any}=} props
 * @param {...any} children
 * @returns {HTMLElement}
 */
export default function el(tagName, props, ...children) {
    const el = document.createElement(tagName)
    if (typeof props === 'object' && props !== null) {
        for (const [prop, val] of Object.entries(props)) {
            if (prop in el) {
                try {
                    el[prop] = val
                    continue
                } catch (_) { }
            }
            if (prop === 'ref' && typeof val === 'function') {
                val(el)
            } else if (prop.startsWith('on') && typeof val === 'function') {
                el.addEventListener(prop.substr(2), val)
            } else if (val === true) {
                el.setAttribute(prop, '')
            } else if (val !== undefined && val !== null) {
                el.setAttribute(prop, String(val))
            }
        }
    }
    if (children.length !== 0) {
        for (const child of flatten(children)) {
            if (child instanceof Node) {
                el.appendChild(child)
            } else if (child !== false && child !== null && child !== undefined) {
                el.appendChild(document.createTextNode(String(child)))
            }
        }
    }
    return el
}
