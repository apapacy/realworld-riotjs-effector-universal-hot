import { createStore, createEvent } from 'effector'
import { parseError } from '../utils'
import { request } from '../agent'

export default class ArticleStore {
  get store () {
    return this.articleStore.getState()
  }

  constructor () {
    this.successArticle = createEvent()
    this.successComments = createEvent()
    this.successAddComment = createEvent()
    this.successDeleteComment = createEvent()
    this.error = createEvent()
    this.updateError = createEvent()
    this.init = createEvent()
    this.articleStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store }))
      .on(this.successArticle, (state, { article }) => ({ ...state, article }))
      .on(this.successComments, (state, { comments }) => ({ ...state, comments }))
      .on(this.successAddComment, (state, { comment }) => {
        return { ...state, comments: [ comment, ...state.comments ] }
      })
      .on(this.successDeleteComment, (state, { id }) => {
        const comments = state.comments.filter(comment => String(comment.id) !== String(id))
        return { ...state, comments }
      })
      .on(this.error, (state, error) => ({ error }))
      .on(this.updateError, (state, error) => ({ ...state, error }))
  }

  article ({ req, slug }) {
    return request(req, {
      method: 'get',
      url: `/articles/${slug}`
    }).then(
      response => this.successArticle(response.data),
      error => this.error(parseError(error))
    )
  }

  saveArticle (article) {
    const { slug } = article
    const data = { article }
    return request(undefined, {
      method: slug ? 'put' : 'post',
      url: slug ? `/articles/${slug}` : '/articles',
      data
    }).then(
      response => this.successArticle(response.data),
      error => this.error(parseError(error))
    )
  }

  deleteArticle (article) {
    const { slug } = article
    return request(undefined, {
      method: 'delete',
      url: `/articles/${slug}`
    }).then(
      () => this.successArticle(null),
      error => this.error(parseError(error))
    )
  }

  comments ({ req, slug }) {
    return request(req, {
      method: 'get',
      url: `/articles/${slug}/comments`
    }).then(
      response => this.successComments(response.data),
      error => this.updateError(parseError(error))
    )
  }

  addComment ({ slug, body }) {
    return request(undefined, {
      method: 'post',
      url: `/articles/${slug}/comments`,
      data: { comment: { body } }
    }).then(
      response => this.successAddComment(response.data),
      error => this.updateError(parseError(error))
    )
  }

  deleteComment ({ slug, id }) {
    return request(undefined, {
      method: 'delete',
      url: `/articles/${slug}/comments/${id}`
    }).then(
      response => this.successDeleteComment({ id }),
      error => this.updateError(parseError(error))
    )
  }

  favorite ({ slug, method }) {
    return request(undefined, {
      method,
      url: `/articles/${slug}/favorite`
    }).then(
      response => this.successArticle(response.data),
      error => this.error(parseError(error))
    )
  };
}
