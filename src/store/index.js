import UserStore from './userStore';
import ArticlesStore from './articlesStore';
// import OrderLine from "./orderline";


// export const orderline = new OrderLine();
const store = () => ({
  userStore: new UserStore(),
  articlesStore: new ArticlesStore(),
});

export default store;

export const getState = (store) => {
  const state = {};
  Object.keys(store).forEach(key => {
    state[key] = store[key].store;
  });
  return state;
}

export const setState = (store, state) => {
  Object.keys(store).forEach(key => {
    store[key].init(state[key]);
  });
}
