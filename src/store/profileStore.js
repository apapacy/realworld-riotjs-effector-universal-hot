import { createStore, createEvent } from 'effector'
import { request } from '../agent'
import { parseError } from '../utils'

export default class ProfileStore {
  get store () {
    return this.profileStore.getState()
  }

  constructor () {
    this.success = createEvent()
    this.error = createEvent()
    this.updateError = createEvent()
    this.init = createEvent()
    this.profileStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store }))
      .on(this.success, (state, data) => ({ data }))
      .on(this.error, (state, error) => ({ error }))
      .on(this.updateError, (state, error) => ({ ...state, error }))
  }

  getProfile ({ req, author }) {
    return request(req, {
      method: 'get',
      url: `/profiles/${decodeURIComponent(author)}`
    }).then(
      response => this.success(response.data.profile),
      error => this.error(parseError(error))
    )
  }

  follow ({ author, method }) {
    return request(undefined, {
      method,
      url: `/profiles/${author}/follow`
    }).then(
      response => this.success(response.data.profile),
      error => this.error(parseError(error))
    )
  }
}
