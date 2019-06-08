import hydrate from '@riotjs/hydrate'
import Layout from './riot/components/layout.riot'
//import './register';
import {getInitialComponentName, setRootComponent} from './router.client';

alert(1)
const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(route =>
  setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     route
     //window.__INITIAL_APPLICATION_PROPS__
   ))
 );
