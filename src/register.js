const riot = require('riot');

const tags = {
  './riot/':['component', 'my-inner', 'my-link'],
  './riot/pages/':['page1', 'page2', 'page3']
}

for (let folder in tags) {
  tags[folder].forEach(function(component) {
    try {
      riot.unregister(component);
    } catch(ex) {
    }
    try {
      riot.register(component, require(`${folder}${component}.riot`).default);
    } catch(ex) {
    }
  });
}
