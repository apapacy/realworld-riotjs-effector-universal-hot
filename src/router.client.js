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
      riot.register(route.page, component.default || component)
    } catch (ex) {
    }
    root.update(route)
    if (component.default.exports && component.default.exports.init) {
      await component.default.exports.init();
    }
    //root.update(route)
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
