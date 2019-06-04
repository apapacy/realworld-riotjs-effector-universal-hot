import UniversalRouter from 'universal-router';
const riot = require('riot');
export default new UniversalRouter([
  { path: '/1', action: () => ['page1', {}] },
  { path: '/2', action: () => ['page2', {}] },
  { path: '(.*)', action: () => ['page3', {}] },
])
