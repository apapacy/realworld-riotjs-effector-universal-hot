import history from './history'
import router from './router'
import * as riot from 'riot'

let root

const render = async (location) => {
  const route = await router.resolve(location)
  const component = await import(`./riot/pages/${route.page}.riot`)
  try {
    riot.unregister(route.page)
  } catch (ex) {
  }
  try {
    riot.register(route.page, component.default || component)
  } catch (ex) {
  }
  if (component.default.exports && component.default.exports.init) {
    await component.default.exports.init({ ...route, store: root.state.store })
  }
  try {
    root.update(route, root)
  } catch (ex) {
  }
}

history.listen(render)

export async function getInitialComponentName () {
  const route = await router.resolve(history.location)
  const component = await import(`./riot/pages/${route.page}.riot`)
  try {
    riot.register(route.page, component.default || component)
  } catch (ex) {
  }
  return route
}

export function setRootComponent (component) {
  root = component
}
