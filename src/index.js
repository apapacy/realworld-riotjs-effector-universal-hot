const riot = require('riot');
import Component from './component.riot'
import Inner from './my-inner.riot'
import hydrate from '@riotjs/hydrate'
riot.register('my-inner', Inner)

const hydrateWithMyComponent = hydrate(Component)

alert(1)
hydrateWithMyComponent(
  document.getElementById('app'),
  window.__INITIAL_APPLICATION_PROPS__
)
alert(2)
