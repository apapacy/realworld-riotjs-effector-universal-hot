import * as riot from 'riot'
import ssr from '@riotjs/ssr';
// import App from './riot/components/layout.riot'
import App from './riot/App.riot'
import router from './router';
import getStore, {getState} from './store';
import stats from '../build/stats.generated';

const pages = {}
const isDevelopment = process.env.NODE_ENV === 'development'

function assets(name) {
  const prefix = '/static/';
  if (name instanceof Array) {
    return prefix + name[0];
  }
  return prefix + name;
}

export const render = async function(req, res, next) {
  const store = getStore();
  try {
    await store.userStore.me({ req });
  } catch(ex) {
  }
  const route = await router.resolve(req.originalUrl);
  if (isDevelopment || !pages[route.page] ) {
    pages[route.page] = require(`./riot/pages/${route.page}.riot`).default
    pages['layout'] = require(`./riot/components/layout.riot`).default
    try {
      riot.unregister(route.page);
    } catch (ex) {
    }
    try {
      riot.unregister('layout');
    } catch (ex) {
    }
    riot.register(route.page, pages[route.page]);
    riot.register('layout', pages['layout']);
  }
  if (pages[route.page] && pages[route.page].exports && pages[route.page].exports.init) {
    await pages[route.page].exports.init({...route, store, req});
  }
  const html = ssr('section', App, {...route, store })
  res.writeHead(200);
  res.write(`
      <!DOCTYPE html>
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Conduit</title>
          <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
          <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
          <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
          <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
          <link rel="stylesheet" href="//demo.productionready.io/main.css">
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(getState(store), null, 2).replace(/</g, '\\u003c')};
            window.__GWT__ = "${(req.signedCookies.token || '').replace(/</g, '\\u003c')}";
          </script>
        </head>
        <body>
          ${html}
          <script src='${assets(stats.common)}' type='text/javascript'></script>
          <script src='${assets(stats.main)}' type='text/javascript'></script>
        </body>
      </html>
    `);
    res.end();
}
