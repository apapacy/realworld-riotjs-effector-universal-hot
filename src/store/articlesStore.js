import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent';
import { parseError } from '../utils';
import { observable, computed } from "mobx";

const GLOBAL_FEED_COUNT = 10;
const PERSONAL_FEED_COUNT = 5;

export default class ArticlesStore {

  get store() {
    return this.articlesStore.getState();
  }

  constructor() {
    this.successArticles = createEvent();
    this.successTags = createEvent();
    this.updateError = createEvent();
    this.init = createEvent();
    this.articlesStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store} ))
      .on(this.successArticles, (state, {articles, articlesCount}) => ({ ...state, articles, articlesCount }))
      .on(this.successTags, (state, tags) => ({ ...state, tags }))
      .on(this.updateError, (state, error) => ({...state, error }));
  }

  feed({ req, filter, value, page }) {
    let limit;
    let offset;
    if (!filter || filter === 'feed' || filter === 'tag') {
      limit = GLOBAL_FEED_COUNT;
    } else {
      limit = PERSONAL_FEED_COUNT;
    }
    if (!page) {
      offset = 0;
    } else {
      offset = (page - 1) * limit;
    }
    const params = { limit, offset };
    if (filter === 'author' || filter === 'favorited' || filter === 'tag') {
      params[filter] = decodeURIComponent(value);
    }
    return request(req, {
      method: 'get',
      url: filter === 'feed' ? '/articles/feed' : '/articles',
      params,
    }).then(
      response => this.successArticles(response.data),
      error => this.updateError(parseError(error)),
    );
  }

  getTags({ req }) {
    return request(req, {
      method: 'get',
      url: '/tags',
    }).then(
      response => this.successTags(response.data.tags),
      error => this.updateError(parseError(error))
    );
  }

/*export function favorite({ slug, method }) {
  return (dispatch) => {
    dispatch({ type: ARTICLE_FAVORITE_REQUEST });

    return request(undefined, {
      method,
      url: `/articles/${slug}/favorite`,
    }).then(
      response => dispatch({ type: ARTICLE_FAVORITE_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_FAVORITE_FAILURE, error: parseError(error) }),
    );
  };
}*/

}
