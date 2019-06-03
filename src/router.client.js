import { createBrowserHistory } from 'history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import router from './router';
const riot = require('riot')

const history = createBrowserHistory();

const _push = history.push;

history.push = function(path, state)
{
    const parsedPath = parse(path);
    const location = history.location;
    if (parsedPath.pathname === location.pathname
        && parsedPath.query === location.search
        && parsedPath.hash === location.hash
        && deepEqual(state, location.state)) {
        return;
    }
    const args = Array.from(arguments);
    args.splice(0, 2);
    return _push.apply(history, [path, state, ...args]);
};

const render = async (location) => {
   alert('rebder')
    const route = await router.resolve(location);
    riot.update("*", { page: route[0] })
};

history.listen(render);

export function getInitialComponentName() {
  return router.resolve(history.location)
}
// render(history.location);
