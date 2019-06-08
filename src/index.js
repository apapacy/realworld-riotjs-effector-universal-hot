import hydrate from '@riotjs/hydrate'
import Layout from './riot/components/layout.riot'
import getStore, {setState} from './store';
import {getInitialComponentName, setRootComponent} from './router.client';
alert(1)
store = getStore();
setState(store, window.__INITIAL_APPLICATION_PROPS__)
delete window.__INITIAL_APPLICATION_PROPS__;
const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(route =>
  setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     { ...route, store }
   ))
 );
