
import { createStore, createEvent } from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent'
import { parseError } from '../utils'

export default class UserStore {
  get store () {
    return this.userStore.getState()
  }

  constructor () {
    this.success = createEvent()
    this.error = createEvent()
    this.updateError = createEvent()
    this.init = createEvent()
    this.userStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store }))
      .on(this.success, (state, data) => ({ data }))
      .on(this.error, (state, error) => ({ error }))
      .on(this.updateError, (state, error) => ({ ...state, error }))
  }

  signup ({ username, email, password }) {
    return request(undefined, {
      method: 'post',
      url: '/users',
      data: { user: { username, email, password } }
    }).then(
      (response) => {
        this.success(response.data.user)
        setJWT(response.data.user.token)
        axios.post('/token', { token: response.data.user.token })
      },
      (error) => {
        this.error(parseError(error))
        setJWT(undefined)
        axios.post('/token', { token: '' })
      }
    )
  }

  login ({ email, password }) {
    return request(undefined, {
      method: 'post',
      url: '/users/login',
      data: { user: { email, password } }
    }).then(
      (response) => {
        this.success(response.data.user)
        setJWT(response.data.user.token)
        axios.post('/token', { token: response.data.user.token })
      },
      (error) => {
        this.error(parseError(error))
        setJWT(undefined)
        axios.post('/token', { token: '' })
      }
    )
  }

  logout () {
    setJWT(undefined)
    axios.post('/token', { token: '' }).then(
      () => this.success(null),
      error => this.error(parseError(error))
    )
  }

  me ({ req }) {
    return request(req, {
      method: 'get',
      url: '/user'
    }).then(
      response => this.success(response.data.user),
      error => this.error(parseError(error))
    )
  }

  save ({ bio, email, image, username, password }) {
    const user = { bio, email, image, username }
    if (password) {
      user.password = password
    }
    return request(undefined, {
      method: 'put',
      url: '/user',
      data: { user }
    }).then(
      response => this.success(response.data.user),
      error => this.updateError(parseError(error))
    )
  }
}
