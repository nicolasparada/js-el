# [`@nicolasparada/el`](https://npm.im/@nicolasparada/el)

Utility to create HTML elements with ease. Inspired in `React.createElement` but for actual DOM.

## Usage

Load it from [unpkg.com](https://unpkg.com/@nicolasparada/el).

```js
import el from 'https://unpkg.com/@nicolasparada/el'

let button

const div = el('div', { className: 'container' }, [
    el('button', { ref: buttonRef, onclick }, 'Click me'),
])

function buttonRef(el) {
    button = el
}

function onclick(ev) {
    console.log('Click', ev)
}

console.assert(div instanceof HTMLDivElement)
console.assert(div.className === 'container')
console.assert(div.childNodes.length === 1)
console.assert(button instanceof HTMLButtonElement)
console.assert(button.onclick === onclick)
console.assert(button.textContent === 'Click me')
```

```js
function el(tagName, props, ...children)
```

- `tagName`: is a `string` with the tag name of the `HTMLElement` to create.
- `props`: is a `Object` mix with properties and attributes to set. The special `ref` prop comes handy to save a reference to the element. You can attach an event listener prefixing the event name with 'on' ex: `{ onsomeevent: onSomeEvent }`.
- `children`: is variadic; this argument will be flatten so you can pass a comma separated list of children or an array. Each child can be of type `Node` or `string`.

This function will return an instance of `HTMLElement`.
