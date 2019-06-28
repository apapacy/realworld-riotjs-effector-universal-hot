import { e, t, m } from '../../ff/e'

export default function (props, child) {
  return e('nav', m(props, { class: 'navbar navbar-light' }), [
    e('div', m(props, { class: 'container' }), [
      e('a', m(props, { class: 'navbar-brand', href: '/' }), [
        t('conduit')
      ])
    ])
  ])
}

/*<layout>
  <nav class="navbar navbar-light">
    <div class="container">
      <a is='navigationlink' class="navbar-brand" href='/'>
        conduit
      </a>
      <ul class="nav navbar-nav pull-xs-right">
        <li is="navigationitem" to="/" { ...props.data } active={ props.data.action === 'home' } if={ !(state.user && state.user.data) }>
          <i class="ion-home" />&nbsp;Home
        </li>
        <li is="navigationitem" to="/feed" active={ props.data.action === 'feed' } { ...props.data } if={ state.user && state.user.data }>
          <i class="ion-home" />&nbsp;Home
        </li>
        <li is="navigationitem" to="/new-post" active={ props.data.action === 'new-post' } { ...props.data } if={ state.user && state.user.data }>
          <i class="ion-compose" />&nbsp;New Post
        </li>
        <li is="navigationitem" to="/settings" active={ props.data.action === 'settings' }  { ...props.data } if={ state.user && state.user.data }>
          <i class="ion-gear-a" />&nbsp;Settings
        </li>
        <li is="navigationitemauthor"
          if={ state.user && state.user.data }
          user={ state.user }
          to={ `/author/${state.user.data.username}` }
        />
        <li is="navigationitem" to="/sign-out" active={ props.data.action === 'sign-out' } { ...props.data } if={ state.user && state.user.data }>
          <i class="ion-log-out" />&nbsp;Sign out
        </li>
        <li is="navigationitem" to="/sign-in" { ...props.data } active={ props.data.action === 'sign-in' } if={ !(state.user && state.user.data) }>
          <i class="ion-log-in" />&nbsp;Sign in
        </li>
        <li is="navigationitem" to="/sign-up" active={ props.data.action === 'sign-up' } { ...props.data }  if={ !(state.user && state.user.data) }>
          <i class="ion-person-add" />&nbsp;Sign up
        </li>
      </ul>
    </div>
  </nav>
  <div class="home-page" is={ props.page } store={ props.store } { ...props.data } />
  <footer>
    <div class={ "container" }>
      <mylink href="/" class="logo-font">conduit</mylink>
      <span class="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
  <script>
    import Navigationlink from '../navigationLink.riot'
    import Navigationitem from './navigationItem.riot'
    import Navigationitemauthor from './navigationItemAuthor.riot'
    import Login from '../pages/login.riot'

    export default {
      connect (props, state) {
        state.userStore = props.store.userStore
        state.user = props.store.userStore.store
      },
      onBeforeMount (props, state) {
        this.connect(props, state)
      },
      onBeforeUpdate (props, state) {
        this.connect(props, state)
      },
      components: {
        Navigationitem,
        Navigationitemauthor,
        Navigationlink,
        Login
      }
    }
  </script>
</layout>
*/
