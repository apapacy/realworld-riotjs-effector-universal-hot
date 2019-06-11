import UniversalRouter from 'universal-router';
export default new UniversalRouter([
  { path: '/sign-in', action: () => ({ page: 'login', data: { action: 'sign-in' } }) },
  { path: '/sign-up', action: () => ({ page: 'login', data: { action: 'sign-up' } }) },
  { path: '/settings', action: () => ({ page: 'settings', data: {action: 'settings' } }) },
  { path: '/', action: (req) => ({ page: 'home', data: { req, action: 'home' } }) },
  { path: '/feed', action: (req) => ({ page: 'home', data: { req, action: 'feed' } }) },
  { path: '/tags/:tag', action: (req) => ({ page: 'home', data: { req, action: 'tag' } }) },
  { path: '(.*)', action: () => ({ page: 'page3' }) },
])
