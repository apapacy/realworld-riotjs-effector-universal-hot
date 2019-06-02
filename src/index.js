
const riot = require('riot');
import Component from './component.riot'
import Inner from './my-inner.riot'

riot.register('my-inner', Inner)


alert(1)
riot.component(Component)(document.getElementById('root'), {})
alert(2)
