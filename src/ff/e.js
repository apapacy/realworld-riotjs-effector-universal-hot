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

export function t (text) {
  return document.createTextNode(text)
}
