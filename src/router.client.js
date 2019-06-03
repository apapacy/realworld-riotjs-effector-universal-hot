import history from './history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import router from './router';
const riot = require('riot')


let currentPage
const render = async (location) => {
   alert('rebder')
    const route = await router.resolve(location);
    currentPage = riot.identifyTagFromDom(document.getElementById("page"))
    currentPage.unmount(true)
    riot.mount(route[0])
};

history.listen(render);

export function getInitialComponentName() {
  return router.resolve(history.location)
}
// render(history.location);
