import UniversalRouter from 'universal-router';
export default new UniversalRouter([
  { path: '/sign-in', action: () => ({ page: 'login', action: 'sign-in' }) },
  { path: '/sign-up', action: () => ({ page: 'login', action: 'sign-up' }) },
  { path: '(.*)', action: () => ({ page: 'page3' }) },
])
