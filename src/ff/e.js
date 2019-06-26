export function e (type='div', props={}, child=[]) {
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
  } else {
    root = type(props, child)
  }
  child.forEach(node => root.appendChild(node))
  return root
}

export function map (props = {}) {
  const out = {}
  out.store = props.store
  out.router = props.router
  return out
}

export function t (text) {
  if (typeof text === 'function') {
    return document.createTextNode(text())
  } else {
    return document.createTextNode(text)
  }
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
