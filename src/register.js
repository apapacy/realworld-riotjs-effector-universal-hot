const riot = require('riot');

const tags = ['component', 'my-inner']

tags.forEach(function(component) {
  try {
    riot.unregister(component);
  } catch(ex) {
  }
  try {
    riot.register(component, require(`./${component}.riot`).default);
  } catch(ex) {
  }
});
