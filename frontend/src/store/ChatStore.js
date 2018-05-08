// import carService from '../services/car.service.js'

export default ({
    strict: true,
    state: {
      count: 1,
    },
    mutations: {
      updateCount(state, payload) {
        state.count += payload.diff;
      }
    },
    getters: {
      carsForDisplay(state) {
        return state.cars;
      }
    },
    actions: {
      // removeSomething(store, {id}) {
      //   return someService.remove(id)
      //   .then(()=>{
      //     store.commit({type: 'removeSomething', id});
      //   })
      // },
    }
  })
  