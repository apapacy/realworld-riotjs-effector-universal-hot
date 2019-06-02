import App from './app.riot'
import hydrate from '@riotjs/hydrate'
import './register';

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
