import history from './history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import router from './router';
import * as riot from 'riot'
console.log('77777777777777777777',riot)
// import register from './register'

let root;
let currentPage

const render = async (location) => {
    const route = await router.resolve(location);
    const component = await import(`./riot/pages/${route[0]}.riot`);
    try {
      riot.register(route[0], component.default || component)
    } catch (ex) {
      //console.log(ex)
    }
    if (component.default.exports && component.default.exports.init) {
      component.default.exports.init();
    }
    root.update({page: route[0], data: route[1]})
};

history.listen(render);

export async function getInitialComponentName() {
  const route = await router.resolve(history.location);
  const component = await import(`./riot/pages/${route[0]}.riot`);
  try {
    riot.register(route[0], component.default || component)
  } catch (ex) {
    //console.log(ex)
  }
  return route;
}

export function setRootComponent(component) {
  root = component;
  console.log(component)
}
// render(history.location);
