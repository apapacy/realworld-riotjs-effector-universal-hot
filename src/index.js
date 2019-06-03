import Layout from './riot/my-layout.riot'
import hydrate from '@riotjs/hydrate'
import './register';
import {getInitialComponentName} from './router.client';

const hydrateWithMyComponent = hydrate(Layout)
alert(1)
getInitialComponentName().then(component => {
   alert(component)
   hydrateWithMyComponent(
     document.getElementById('app'),
     {page: component[0]}
     //window.__INITIAL_APPLICATION_PROPS__
   )
 });
