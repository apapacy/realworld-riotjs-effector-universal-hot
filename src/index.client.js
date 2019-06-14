import hydrate from '@riotjs/hydrate'
// import Layout from './riot/components/layout.riot'
import App from './riot/App.riot';
import getStore, {setState, getState} from './store';
import {getInitialComponentName, setRootComponent} from './router.client';
const store = getStore();
setState(store, window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__;
const hydrateWithMyComponent = hydrate(App)
getInitialComponentName().then(route =>
  setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     { ...route, store }
   ))
 );
