import { e, t, m } from '../ff/e'
import Layout from './components/layout'

export default function (props) {
  return e('component', m(props, { id: 'app' }), [
    Layout(m(props)),
    t('========================')
  ])
}
