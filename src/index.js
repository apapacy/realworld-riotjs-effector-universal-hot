import Layout from './riot/my-layout.riot'
import hydrate from '@riotjs/hydrate'
//import './register';
import {getInitialComponentName, setRootComponent} from './router.client';

const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(componentName =>
    alert(componentName) + setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     {page: componentName}
     //window.__INITIAL_APPLICATION_PROPS__
   ))
 );
