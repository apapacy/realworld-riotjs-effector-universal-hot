export function e (type = 'div', props = {}, child = []) {
  let root
  if (typeof type === 'string') {
    root = document.createElement(type)
    for (let key in props) {
      if (key.substring(0, 2) === 'on') {
        root[key] = props[key]
      } else {
        root.setAttribute(key, props[key])
      }
    }
    child.forEach(node => root.appendChild(node))
  } else {
    root = type(props, child)
  }
  return root
}

export function t (text, props) {
  if (typeof text === 'function') {
    return document.createTextNode(text(props))
  } else {
    return document.createTextNode(text)
  }
}

export function m (base = {}, props = {}) {
  const out = {}
  out.store = base.store
  out.router = base.router
  return { ...props, ...out }
}
/*

document.getElementById('app').appendChild(inner({class: 'gold'}, [t('hi-hi')]))

function inner(props = {}, child = []) {
  return e('div', { ...props, onclick }, child)

  function onclick(e) {
    console.log(e)
    alert('click')
  }
}

*/
