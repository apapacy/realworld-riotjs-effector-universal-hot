import App from './riot/app.riot'
import hydrate from '@riotjs/hydrate'
import './register';
import router from './router';

const hydrateWithMyComponent = hydrate(App)

alert(1)
hydrateWithMyComponent(
  document.getElementById('app'),
  window.__INITIAL_APPLICATION_PROPS__
)
alert(2)
