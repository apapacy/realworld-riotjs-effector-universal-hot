import Layout from './riot/my-layout.riot'
import hydrate from '@riotjs/hydrate'
import './register';
import {getInitialComponentName, setRootComponent} from './router.client';

const hydrateWithMyComponent = hydrate(Layout)
getInitialComponentName().then(component => 
    setRootComponent(hydrateWithMyComponent(
     document.getElementById('app'),
     {page: component[0]}
     //window.__INITIAL_APPLICATION_PROPS__
   ))
 );
