import UserStore from './userStore';
// import OrderLine from "./orderline";


// export const orderline = new OrderLine();
const store = () => ({
  userStore: new UserStore(),
});

export default store;

export const getState = (store) => {
  const state = {};
  Object.keys(store).forEach(key => {
    state[key] = store[key].state;
  });
  return state;
}

export const setState = (store, state) => {
  Object.keys(store).forEach(key => {
    store[key].inject(state[key]);
  });
}
