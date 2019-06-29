import history from '../history'
import { e, t, m } from '../ff/e'

export default function (props, childs) {
  return e('a', m(props, { ...props, onclick: onclick }), childs)
  function onclick (e) {
    e.preventDefault()
    history.navigate(e.currentTarget.getAttribute('href'))
    e.stopPropagation()
    if (props.onclick) {
      props.onclick.call(this, e)
    }
  }
}
