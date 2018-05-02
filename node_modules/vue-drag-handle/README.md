# vue-drag-handle

To make something responsive to dragging, a drag-handle is needed.

### [Demo](https://vue-comps.github.io/vue-drag-handle)

### Used in
- [side-nav](https://vue-comps.github.io/vue-side-nav)
- [materialize:toaster](https://github.com/paulpflug/vue-materialize#toaster)

# Install

```sh
npm install --save-dev vue-drag-handle vue-touch
```
or include `build/bundle.js`.

## Usage
```coffee
# somewhere
Vue.use(require('vue-touch'))

# in your component
components:
  "drag-handle": require("vue-drag-handle")
# or, when using bundle.js
components:
  "drag-handle": window.vueComps.dragHandle
```
```html
<drag-handle
  @move="move"
  @left="open"
  @aborted="close"
  :max-left="200"
></drag-handle>
```

For examples see [`dev/`](dev/).

#### Props
| Name | type | default | description |
| ---:| --- | ---| --- |
| factor | Number | 2 | speed factor which is multiplied with the movement |
| z-index | Number | 1002 | z-index of the overlay |
| max-left | Number | 0 | maximum panning to the left |
| max-right | Number | 0 | maximum panning to the right |
| offset | Number | 0 | will be added to the position on `move` event |
| disabled | Boolean |  false | set to disable |


#### Events
| Name |  description |
| ---:| --- |
| move |  will be emitted on move. Argument is the current position (can be negative) |
| left |  (deprecated) will be emitted on end of panning if move reached max-left |
| right | (deprecated)  will be emitted on end of panning if move reached max-right |
| max |  will be emitted on end of panning with argument `left` when `max-left` is reached or `right` when `max-right` is reached |
| aborted | will be emitted when panning didn't reach max-left or max-right |
| clean-click | will be emitted on click which is no mouseup of final panning |


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
