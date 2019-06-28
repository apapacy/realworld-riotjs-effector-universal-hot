import App from './etm/App'

const app = document.getElementById('app')
app.parentElement.replaceChild(App({}), app)
