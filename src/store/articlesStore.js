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

  feed({ req, action, page, tag, author, favorited }) {
    console.log(arguments)
    const limit = 10
    const offset = (page - 1) * limit;
    const params = { limit, offset };
    if (action === 'tag') {
      params.tag = decodeURIComponent(tag);
    } else if (action === 'author') {
      params.author = decodeURIComponent(author);
    } else if (action === 'favorited') {
      params.favorited = decodeURIComponent(author);
    }
    return request(req, {
      method: 'get',
      url: action === 'feed' ? '/articles/feed' : '/articles',
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
