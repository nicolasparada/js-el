# [`@nicolasparada/el`](https://npm.im/@nicolasparada/el)

Utility to create HTMLElements with ease. Inspired in `React.createElement`.

## Usage

Load it from [unpkg.com](https://unpkg.com/@nicolasparada/el).

```js
import el from 'https://unpkg.com/@nicolasparada/el'

const p = el('p', undefined, 'Hello, world!')
console.assert(p instanceof HTMLParagraphElement)
console.assert(p.textContent === 'Hello, world!')
document.body.appendChild(p)

let button
function onclick(ev) {
    console.log('Click', ev)
}
const div = el('div', { className: 'container' }, [
    el('button', { ref: el => button = el, onclick }, 'Click me'),
])
console.assert(div instanceof HTMLDivElement)
console.assert(div.className === 'container')
console.assert(div.childNodes.length === 1)
console.assert(button instanceof HTMLButtonElement)
console.assert(button.onclick === onclick)
console.assert(button.textContent === 'Click me')
document.body.appendChild(div)
```

```js
function el(tagName, props, ...children)
```

- `tagName`: is a `string` with the `HTMLElement` tag name to create.
- `props`: is a `Object` mix with properties and attributes to set. The special `ref` prop comes handy to save a reference to the element. You can attach a listener to a custom event, but remember it needs to start with `on` and it will be lowercased.
- `children`: is variadic; this argument will be flatten so you can pass a comma separated list of children, an array or a mix of those two. Each child can be of type `Node` or `string`.

This function will return an instance of `HTMLElement`.
