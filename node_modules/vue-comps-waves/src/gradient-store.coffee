# out: ../gradient-store.js
store = null
creator = (Vue) ->
  unless store?
    Store = Vue.extend(creator.obj)
    store = new Store()
  return store
creator.obj = require('./gradient-store-component')

module.exports = creator
