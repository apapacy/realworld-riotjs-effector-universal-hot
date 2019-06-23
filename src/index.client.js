import { e, t } from './ff/e'

alert(1)
const $root = e('div', {class: 'new'})
alert(2)

document.getElementById('app').appendChild(inner({class: 'gold'}, [t('hi-hi')]))
alert(4)

function inner(props = {}, child = []) {
  return e('div', { ...props, onclick }, child)

  function onclick(e) {
    console.log(e)
    alert('click')
  }
}
