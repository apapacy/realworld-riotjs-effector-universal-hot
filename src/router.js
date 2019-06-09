import UniversalRouter from 'universal-router';
export default new UniversalRouter([
  { path: '/sign-in', action: () => ({ page: 'login', data: { action: 'sign-in' } }) },
  { path: '/sign-up', action: () => ({ page: 'login', data: { action: 'sign-up' } }) },
  { path: '/settings', action: () => ({ page: 'settings', data: { } }) },
  { path: '(.*)', action: () => ({ page: 'page3' }) },
])
