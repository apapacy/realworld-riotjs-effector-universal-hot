import UniversalRouter from 'universal-router';
const riot = require('riot');
const router = new UniversalRouter([
  { path: '/1', action: () => riot.mount('#app', {}, 'page1') },
  { path: '/2', action: () => riot.mount('page2') },
])

router.resolve({ pathname: '/1', user: 'admin' })
  .then(result => alert(result))
