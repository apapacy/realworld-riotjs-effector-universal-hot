import { createBrowserHistory } from 'history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';
import router from './router';
const riot = require('riot')
const isNode=new Function("try {return this===global;}catch(e){return false;}");
let history;

if(!isNode()) {
  history = createBrowserHistory();
  const _push = history.push;
  history.push = function(path, state) {
      const parsedPath = parse(path);
      const location = history.location;
      console.log(location)
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
} else {
  history = {};
  history.push = function(){};
}


export default history;
