import history from './history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import {intercept, observe} from 'mobx';
import router from './router';
import * as riot from 'riot'

let root;
let currentPage

const render = async (location) => {
    const route = await router.resolve(location);
    const component = await import(`./riot/pages/${route.page}.riot`);
    try {
      riot.unregister(route.page)
    } catch (ex) {
      console.log(ex)
    }
    try {
      riot.register(route.page, component.default || component)
    } catch (ex) {
      console.log(ex)
    }
    console.log('component', component)
    if (component.default.exports && component.default.exports.init) {
      alert('init')
      await component.default.exports.init({...route, store: root.state.store});
    }
    console.log(root)
    alert(1)
    try {
      root.update(route, root)
    } catch (ex) {
      console.log(ex)
    }
    alert(2)
};

history.listen(render);

export async function getInitialComponentName() {
  const route = await router.resolve(history.location);
  const component = await import(`./riot/pages/${route.page}.riot`);
  try {
    riot.register(route.page, component.default || component)
  } catch (ex) {
  }
  return route;
}

export function setRootComponent(component) {
  root = component;
}
