# vue-comps-waves

Material design click animation. Done with svg and `Velocity.js`.
Very lightweight if `Velocity.js` is present.

### [Demo](https://vue-comps.github.io/vue-comps-waves)

# Install

```sh
npm install --save-dev vue-comps-waves
```
or include `build/bundle.js`.

## Usage

```coffee
components:
  waves: require("vue-comps-waves")
  # or with bundle.js
  waves: window.vueComps.waves
]
```
```html
<button>Click me!
  <waves></waves>
</button>
```

For examples see [`dev/`](dev/).

#### Props
Name | type | default | description
---:| --- | ---| ---
color | String | "black" | color of the effect
speed | Number | 1 | speed of the effect


# Development
Clone repository
```sh
npm install
npm run dev
```
Browse to `http://localhost:8080/`.

## Changelog

- 1.0.0  
Usage changes to attach to parent instead of being the parent.  

## License
Copyright (c) 2016 Paul Pflugradt
Licensed under the MIT license.
