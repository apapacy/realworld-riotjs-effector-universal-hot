import hydrate from '@riotjs/hydrate'
import Layout from './riot/components/layout.riot'
import store from './store';
import {getInitialComponentName, setRootComponent} from './router.client';
console.log('555555555555555', store)
alert(1)
const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(route =>
  setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     { ...route, store }
     //window.__INITIAL_APPLICATION_PROPS__
   ))
 );
