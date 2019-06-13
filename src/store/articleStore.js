import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { parseError } from '../utils';
import { observable, computed } from "mobx";
import { request } from '../agent';


const initialState = {
  article: { author: {}, tagList: [] },
  comments: [],
};


export default class ArticleStore {

  get store() {
    return this.articleStore.getState();
  }

  constructor() {
    this.successArticle = createEvent();
    this.successComments = createEvent();
    this.successAddComment = createEvent();
    this.successDeleteComment = createEvent();
    this.error = createEvent();
    this.updateError = createEvent();
    this.init = createEvent();
    this.articleStore = createStore(null)
      .on(this.init, (state, store) => ({ ...store} ))
      .on(this.successArticle, (state, { article }) => ({ ...state, article }))
      .on(this.successComments, (state, { comments }) => ({ ...state, comments }))
      .on(this.successAddComment, (state, { comment }) => {
        return { ...state, comments: [comment, ...state.comments]  };
      })
      .on(this.successDeleteComment, (state, { id }) => {
        const comments = state.comments.filter(comment => comment.id != id);
        return { ...state, comments };
      })
      .on(this.error, (state, error) => ({ error }))
      .on(this.updateError, (state, error) => ({...state, error }));
  }

article({ req, slug }) {
  return request(req, {
    method: 'get',
    url: `/articles/${slug}`,
  }).then(
    response => this.successArticle(response.data),
    error => this.error(parseError(error)),
  );
}


/*export function saveArticle(article) { // eslint-disable-line no-shadow
  const { slug } = article;
  const data = { article };
  return (dispatch) => {
    dispatch({ type: ARTICLE_SAVE_REQUEST });
    return request(undefined, {
      method: slug ? 'put' : 'post',
      url: slug ? `/articles/${slug}` : '/articles',
      data,
    }).then(
      response => dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_SAVE_FAILURE, error: parseError(error) }),
    );
  };
}

export function deleteArticle(article) { // eslint-disable-line no-shadow
  const { slug } = article;
  return (dispatch) => {
    dispatch({ type: ARTICLE_DELETE_REQUEST });
    return request(undefined, {
      method: 'delete',
      url: `/articles/${slug}`,
    }).then(
      () => dispatch({ type: ARTICLE_DELETE_SUCCESS }),
      error => dispatch({ type: ARTICLE_DELETE_FAILURE, error: parseError(error) }),
    );
  };
}*/

comments({ req, slug }) {
  return request(req, {
    method: 'get',
    url: `/articles/${slug}/comments`,
  }).then(
    response => this.successComments(response.data),
    error => this.updateError(parseError(error))
  );
}


addComment({ slug, body }) {
  return request(undefined, {
    method: 'post',
    url: `/articles/${slug}/comments`,
    data: { comment: { body } },
  }).then(
    response => this.successAddComment(response.data),
    error => this.updateError(parseError(error))
  );
}


deleteComment({ slug, id }) {
  return request(undefined, {
    method: 'delete',
    url: `/articles/${slug}/comments/${id}`,
  }).then(
    response => this.successDeleteComment( {id} ),
    error => this.updateError(parseError(error))
  );
};


/*export function follow({ author, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: ARTICLE_FOLLOW_FAILURE, error: { message: 'Only post or delete methos alowed' } };
  }

  return (dispatch) => {
    dispatch({ type: ARTICLE_FOLLOW_REQUEST });

    return request(undefined, {
      method,
      url: `/profiles/${author}/follow`,
    }).then(
      response => dispatch({ type: ARTICLE_FOLLOW_SUCCESS, payload: response.data }),
      error => dispatch({ type: ARTICLE_FOLLOW_FAILURE, error: parseError(error) }),
    );
  };
}

export function favorite({ slug, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: ARTICLE_FAVORITE_FAILURE, error: { message: 'usernameOnly post or delete methos alowed' } };
  }

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
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}*/
}
