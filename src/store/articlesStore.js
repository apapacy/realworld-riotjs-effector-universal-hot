import { createStore, createEvent } from 'effector'
import { request } from '../agent'
import { parseError } from '../utils'

// const GLOBAL_FEED_COUNT = 10;
// const PERSONAL_FEED_COUNT = 5;

export default class ArticlesStore {
  get store () {
    return this.articlesStore.getState()
  }

  constructor () {
    this.successArticles = createEvent()
    this.successTags = createEvent()
    this.updateError = createEvent()
    this.updateArticle = createEvent()
    this.init = createEvent()
    this.articlesStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store }))
      .on(this.successArticles, (state, { articles, articlesCount }) => ({ ...state, articles, articlesCount }))
      .on(this.successTags, (state, tags) => ({ ...state, tags }))
      .on(this.updateError, (state, error) => ({ ...state, error }))
      .on(this.updateArticle, (state, article) => {
        const articles = state.articles.map(item => {
          if (item.slug === article.slug) {
            return article
          } else {
            return item
          }
        })
        return { ...state, articles }
      })
  }

  feed ({ req, action, page, tag, author, favorited }) {
    const limit = 10
    const offset = (page - 1) * limit
    const params = { limit, offset }
    if (action === 'tag') {
      params.tag = decodeURIComponent(tag)
    } else if (action === 'author') {
      params.author = decodeURIComponent(author)
    } else if (action === 'favorited') {
      params.favorited = decodeURIComponent(author)
    }
    return request(req, {
      method: 'get',
      url: action === 'feed' ? '/articles/feed' : '/articles',
      params
    }).then(
      response => this.successArticles(response.data),
      error => this.updateError(parseError(error))
    )
  }

  getTags ({ req }) {
    return request(req, {
      method: 'get',
      url: '/tags'
    }).then(
      response => this.successTags(response.data.tags),
      error => this.updateError(parseError(error))
    )
  }

  updateCurrentArticle (article) {
    this.updateArticle(article)
  }
}
