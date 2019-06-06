import * as riot from 'riot'
import ssr from '@riotjs/ssr';
import App from './riot/components/layout.riot'
import router from './router';
const pages = {}
const isDevelopment = process.env.NODE_ENV === 'development'
export const render = async function(req, res, next) {
  const route = await router.resolve(req.originalUrl);
  if (isDevelopment || !pages[route[0]] ) {
    pages[route[0]] = require(`./riot/pages/${route[0]}.riot`).default
    try {
      riot.unregister(route[0]);
    } catch (ex) {
      console.log(ex);
    }
    riot.register(route[0], pages[route[0]]);
  }
  const html = ssr('section', App, {page: route[0]})
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
        </head>
        <body>
          <section id="app">${html}</section>
          <script src='/static/common.bundle.js' type='text/javascript'></script>
          <script src='/static/main.bundle.js' type='text/javascript'></script>
        </body>
      </html>
    `);
    res.end();
}
