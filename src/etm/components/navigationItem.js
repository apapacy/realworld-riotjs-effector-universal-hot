import { e, t, m } from '../../ff/e'
import navigationLink from '../navigationLink'

export default function (props, childs) {
  console.log('+++++++++++++', childs)
  return e('li', m(props, { ...props, class: `nav-item${props.active ? ' active' : ''}` }), [
    e(navigationLink, m(props, { ...props, class: `nav-link${props.active ? ' active' : ''}` }), childs)
  ])
}
