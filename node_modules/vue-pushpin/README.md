# vue-pushpin

Fixed positioning, which respects header and footer.

### [Demo](https://vue-comps.github.io/vue-pushpin)


# Install

```sh
npm install --save-dev vue-pushpin
```
or include `build/bundle.js`.

## Usage
```coffee
# in your component
components:
  "pushpin": require("vue-pushpin")
# or, when using bundle.js
components:
  "pushpin": window.vueComps.pushpin
```
```html
<pushpin>
  <div>content</div>
</pushpin>
```

The pushpin will change its `position` to `absolute`, so it should be positioned relative to `body`.

For examples see [`dev/`](dev/).

#### Props
Name | type | default | description
---:| --- | ---| ---
top | Number | 0 | minimum distance to document top (header height)
offset | Number | 0 | distance to the viewport top on scrolling (should be smaller than top)
bottom | Number | 0 | minimum distance to document bottom (footer height)

## Changelog
- 1.0.0  
some cleaning  
added unit tests  

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
