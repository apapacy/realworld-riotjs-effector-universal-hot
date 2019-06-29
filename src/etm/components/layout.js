import { e, t, m } from '../../ff/e'

export default function (props, child) {
  return e('div', m(props, {}), [
    e('nav', m(props, { class: 'navbar navbar-light' }), [
      e('div', m(props, { class: 'container' }), [
        e('a', m(props, { class: 'navbar-brand', href: '/' }), [
          t('conduit')
        ]),
        e('ul', m(props, { class: 'nav navbar-nav pull-xs-right' }), [
          e('li', m(props, { class: 'nav-item' }), [
            e('i', m(props, { class: 'ion-home' }), []),
            t('\u0020Home')
          ]),
          e('li', m(props, { class: 'nav-item' }), [
            e('i', m(props, { class: 'ion-home' }), []),
            t('\u0020New Post')
          ])
        ])
      ])
    ]),
    e('div', m(props, { class: 'home-page' }), []),
    e('footer', m(props, {}), [
      e('div', m(props, { class: 'conrainer' }), [
        e('a', m(props, { class: 'logo-font', href: '/' }), [
          t('conduit')
        ]),
        e('span', m(props, { class: 'attribution' }), [
          t('An interactive learning project from'),
          e('a', m(props, { href: 'https://thinkster.io' }), [
            t('Thinkster')
          ]),
          t('. Code & design licensed under MIT.')
        ])
      ])
    ])
  ])
}
