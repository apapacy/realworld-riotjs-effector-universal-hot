const riot = require('riot');
import App from './app.riot'
import Component from './component.riot'
import Inner from './my-inner.riot'
import hydrate from '@riotjs/hydrate'
riot.register('my-inner', Inner)
riot.register('component', Component)

const hydrateWithMyComponent = hydrate(App)

alert(1)
hydrateWithMyComponent(
  document.getElementById('app'),
  window.__INITIAL_APPLICATION_PROPS__
)
alert(2)

if (module.hot) {
  module.hot.accept(function() {
    alert(1)
    const hydrateWithMyComponent = hydrate(Component)
    hydrateWithMyComponent(
      document.getElementById('app'),
      window.__INITIAL_APPLICATION_PROPS__
    )
    alert(2)
 });
}
