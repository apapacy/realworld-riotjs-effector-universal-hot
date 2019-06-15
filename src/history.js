import { createBrowserHistory } from 'history'
import parse from 'url-parse'
import deepEqual from 'deep-equal'
const isNode = new Function('try {return this===global;}catch(e){return false;}')
let history

if (!isNode()) {
  history = createBrowserHistory()
  history.navigate = function (path, state) {
    const parsedPath = parse(path)
    const location = history.location
    if (parsedPath.pathname === location.pathname &&
      parsedPath.query === location.search &&
      parsedPath.hash === location.hash &&
      deepEqual(state, location.state)) {
      return
    }
    const args = Array.from(arguments)
    args.splice(0, 2)
    return history.push(...[path, state, ...args])
  }
} else {
  history = {}
  history.navigate = function () {}
}

export default history
