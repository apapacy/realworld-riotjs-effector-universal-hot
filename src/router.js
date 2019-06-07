import UniversalRouter from 'universal-router';
export default new UniversalRouter([
  { path: '/sign-in', action: () => ['login', { action: 'sign-in' }] },
  { path: '/sign-up', action: () => ['login', { action: 'sign-up' }] },
  { path: '(.*)', action: () => ['page3', {}] },
])
