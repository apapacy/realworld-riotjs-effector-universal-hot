const riot = require('riot');

const tags = {
  './riot/':['component', 'my-inner', 'my-link', 'my-layout'],
  './riot/pages/':['page1', 'page2', 'page3']
}

const register = {};

for (let folder in tags) {
  tags[folder].forEach(function(componentName) {
    try {
      riot.unregister(componentName);
    } catch(ex) {
    }
    try {
      const component = require(`${folder}${componentName}.riot`).default;
      riot.register(componentName, component);
      register[componentName]  = component;
    } catch(ex) {
    }
  });
}

export default register;
