import hydrate from '@riotjs/hydrate'
import Layout from './riot/components/layout.riot'
import getStore, {setState, getState} from './store';
import {getInitialComponentName, setRootComponent} from './router.client';
alert(1)
const store = getStore();
setState(store, window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__;
console.log(getState(store))
alert(2)
const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(route =>
  setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     { ...route, store }
   ))
 );
