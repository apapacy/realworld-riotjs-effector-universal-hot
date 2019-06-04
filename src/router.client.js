import history from './history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import router from './router';
const riot = require('riot')


let root;
let currentPage

const render = async (location) => {
   alert('rebder')
    const route = await router.resolve(location);
    root.update({page: route[0]})
};

history.listen(render);

export function getInitialComponentName() {
  return router.resolve(history.location)
}

export function setRootComponent(component) {
  root = component;
  console.log(component)
}
// render(history.location);
