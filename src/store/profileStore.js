import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent';
import { parseError } from '../utils';

import { observable, computed } from "mobx";


export default class ProfileStore {

get store() {
  return this.profileStore.getState();
}

constructor() {
  this.success = createEvent();
  this.error = createEvent();
  this.updateError = createEvent();
  this.init = createEvent();
  this.profileStore = createStore(null)
    .on(this.init, (state, store) => ({ ...store} ))
    .on(this.success, (state, data) => ({ data }))
    .on(this.error, (state, error) => ({ error }))
    .on(this.updateError, (state, error) => ({...state, error }));
}



getProfile({ req, author }) {
  return request(req, {
    method: 'get',
    url: `/profiles/${decodeURIComponent(author)}`,
  }).then(
    response => this.success(response.data.profile),
    error => this.error(parseError(error))
  );
}


/*export function follow({ author, method }) {
  if (method !== 'post' && method !== 'delete') {
    return { type: PROFILE_FOLLOW_FAILURE, error: { message: 'Only post or delete methos alowed' } };
  }
  return (dispatch) => {
    dispatch({ type: PROFILE_FOLLOW_REQUEST });
    return request(undefined, {
      method,
      url: `/profiles/${author}/follow`,
    }).then(
      response => dispatch({ type: PROFILE_FOLLOW_SUCCESS, payload: response.data }),
      error => dispatch({ type: PROFILE_FOLLOW_FAILURE, error: parseError(error) }),
    );
  };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}
*/
}
