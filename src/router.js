import UniversalRouter from 'universal-router';
export default new UniversalRouter([
  { path: '/sign-in', action: () => ({ page: 'login', data: { action: 'sign-in' } }) },
  { path: '/sign-up', action: () => ({ page: 'login', data: { action: 'sign-up' } }) },
  { path: '/settings', action: () => ({ page: 'settings', data: {action: 'settings' } }) },
  { path: '/', action: (req) => ({ page: 'home', data: { req, action: 'home' } }) },
  { path: '/page/:page', action: (req) => ({ page: 'home', data: { req, action: 'home' } }) },
  { path: '/feed', action: (req) => ({ page: 'home', data: { req, action: 'feed' } }) },
  { path: '/feed/page/:page', action: (req) => ({ page: 'home', data: { req, action: 'feed' } }) },
  { path: '/tags/:tag', action: (req) => ({ page: 'home', data: { req, action: 'tag' } }) },
  { path: '/tags/:tag/page/:page', action: (req) => ({ page: 'home', data: { req, action: 'tag' } }) },
  { path: '/article/:article', action: (req) => ({ page: 'article', data: { req, action: 'article' } }) },
  { path: '/edit/:article', action: (req) => ({ page: 'editor', data: { req, action: 'edit' } }) },
  { path: '/new-post', action: (req) => ({ page: 'editor', data: { req, action: 'new-post' } }) },
  { path: '/author/:author', action: (req) => ({ page: 'profile', data: { req, action: 'author' } }) },
  { path: '/favorited/:author', action: (req) => ({ page: 'profile', data: { req, action: 'favorited' } }) },
  { path: '/favorited/:author/page/:page', action: (req) => ({ page: 'profile', data: { req, action: 'favorited' } }) },
  { path: '(.*)', action: () => ({ page: 'page3' }) },
])
