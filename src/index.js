import hydrate from '@riotjs/hydrate'
import Layout from './riot/my-layout.riot'
//import './register';
import {getInitialComponentName, setRootComponent} from './router.client';

console.log(Layout)
const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(componentName =>
    alert(componentName) + setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     {page: componentName}
     //window.__INITIAL_APPLICATION_PROPS__
   ))
 );
