# vue-comps-tooltip

a unstyled tooltip, which adjusts opening direction to be in viewport.

### [Demo](https://vue-comps.github.io/vue-comps-tooltip)

# Install

```sh
npm install --save-dev vue-comps-tooltip
```
or include `build/bundle.js`.

## Usage
```coffee
# in your component
components:
  "tooltip": require("vue-comps-tooltip")
# or, when using bundle.js
components:
  "tooltip": window.vueComps.tooltip
```
```html
<button> Hover
  <tooltip>Content</tooltip>
</button>
```
see [`dev/`](dev/) for examples.

#### Props
Name | type | default | description
---:| --- | ---| ---
offset | Number | 0 | offset to the parent
anchor | String | "snwe" | direction of opening, viewport dependent. "s" forces to open down. "sn" would try to open down, the up.
ignore-parent | Boolean | false | will not set-up `mouseenter`/`mouseleave` listener on parent
is-opened	| Boolean	| false | (two-way) set to open / close
transition | String | "tooltip" | name of a vue transition. [Detailed description](#transition)
parent | Element | parentElement | where the tooltip should attach its listeners
on-body | Boolean | false | will be positioned on body instead of parent element. [Detailed description](#positioning)

#### Events
Name |  description
---:| ---
before-enter | will be called before open animation
after-enter |  will be called when opened
before-leave |  will be called before close animation
after-leave |  will be called when closed
toggled(isOpened:Boolean) | emitted when gets opened or closed. Alternative to use two-way `is-opened` prop

#### Positioning
There are two ways of positioning. The default is as a child of the parent element, the other posibility is on `body`.
- The parent positioning can be problematic when you have an `overflow:hidden` as a parent to the nearest element with `position:absolute|relative|fixed` and the tooltip is overflowing.
- the `body` positioning can be problematic when the parent is moving relative to `body` or when you depend on inheritance of styles.

#### Transition

You can provide a vue transition like this:
```js
Vue.transition("fade",{
  // your transition
})
// or in the instance:
transitions: {
  fade: {
    // your transition
  }
}
// usage:
template: "<tooltip transition='fade'></tooltip>"
```

You can access several properties in your enter hook:
```js
enter: function(el,cb) {
  // in which direction the tooltip will open. one of s, n, w or e
  this.direction
  // style properties as numbers
  this.top
  this.left
  this.width
  this.height
  this.offset // will be added on or subtracted of top or left depending on direction
}
```

see [`dev/transition`](dev/transition.vue) for a working example.

## Changelog
- 1.1.0  
added toggled event  
set default transition  

- 1.0.0  
renamed `position` prop to `on-body` - now is a boolean  
now using vue transitions  
events are renamed after vue transitions  


# Development
Clone repository.
```sh
npm install
npm run dev
```
Browse to `http://localhost:8080/`.

## License
Copyright (c) 2016 Paul Pflugradt
Licensed under the MIT license.
