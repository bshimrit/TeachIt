# vue-toggle

A toggle button for simple state management.

### [Demo](https://vue-comps.github.io/vue-toggle)


# Install

```sh
npm install --save-dev vue-toggle
```
or include `build/bundle.js`.

## Usage
```coffee
# in your component
components:
  "toggle": require("vue-toggle")
# or, when using bundle.js
components:
  "toggle": window.vueComps.toggle
```
```html
<toggle>
  click to switch
  <span slot="on"> off</span>
  <span slot="off"> on</span>
</toggle>
```
For examples see [`dev/`](dev/).

#### Props
| Name | type | default | description |
| ---:| --- | ---| --- |
| is-on | Boolean | false | (two-way) toggle state |
| on-class | String | "on" | class of button when on |
| off-class | String | "off" | class of button when off |
| disabled | Boolean | false | is disabled |

#### Events
| Name |  description |
| ---:| --- | ---| --- |
| off |  will be emitted on click when state was on |
| on |  will be emitted on click when state was off |
| toggle |  will be emitted on click |

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
