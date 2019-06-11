
import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent';
import { parseError } from '../utils';

import { observable, computed } from "mobx";


export default class UserStore {

get store() {
  return this.userStore.getState();
}

constructor() {
  this.success = createEvent();
  this.error = createEvent();
  this.updateError = createEvent();
  this.init = createEvent();
  this.userStore = createStore(null)
    .on(this.init, (state, store) => ({ ...store} ))
    .on(this.success, (state, data) => ({ data }))
    .on(this.error, (state, error) => ({ error }))
    .on(this.updateError, (state, error) => ({...state, error }));
}

/*export function signup({ username, email, password }) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    return request(undefined, {
      method: 'post',
      url: '/users',
      data: { user: { username, email, password } },
    }).then(
      (response) => {
        setJWT(response.data.user.token);
        // set cookie with frontend server
        axios.post('/api/token', { token: response.data.user.token });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      },
      (error) => {
        setJWT(undefined);
        // clear cookie with frontend server
        axios.post('/api/token', { token: '' });
        dispatch({ type: SIGNUP_FAILURE, error: parseError(error) });
      },
    );
  };
}*/

  login({ email, password }) {
    return request(undefined, {
      method: 'post',
      url: '/users/login',
      data: { user: { email, password } },
    }).then(
      (response) => {
        this.success(response.data.user);
        setJWT(response.data.user.token);
        axios.post('/token', { token: response.data.user.token });
      },
      (error) => {
        this.error(parseError(error));
        setJWT(undefined);
        axios.post('/token', { token: '' });
      },
    );
  }

  me({ req }) {
    return request(req, {
      method: 'get',
      url: '/user',
    }).then(
      response => this.success(response.data.user),
      error => this.error(parseError(error))
    );
  }

  save({ bio, email, image, username, password }) {
    const user = { bio, email, image, username };
    if (password) {
      user.password = password;
    }
    return request(undefined, {
      method: 'put',
      url: '/user',
      data: { user },
    }).then(
      response => this.success(response.data.user),
      error => this.updateError(parseError(error)),
    );
  }


/*export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    // clear cookie with frontend server
    return axios.post('/api/token', { token: '' })
      .then(
        () => {
          setJWT(undefined);
          dispatch({ type: LOGOUT_SUCCESS });
        },
        (error) => {
          dispatch({ type: LOGOUT_FAILURE, error: parseError(error) });
        },
      );
  };
}*/

/*export function clearErrors() {
  return { type: CLEAR_ERRORS };
}*/

}
