
import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent';
import { parseError } from '../utils';


export default class UserStore {

  get state() {
    return this.store.getState();
  }

  constructor() {
    this.store = createStore({});
    this.userLoginSuccess = createEvent('user:login:success');
    this.userLoginError = createEvent('user:login:error');
    this.inject = createEvent('user:inject');
    this.store.on(this.userLoginSuccess, (before, user) => {
      console.log('+++++++++++++', user)
      return { user }
    });
    this.store.on(this.userLoginError, (before, error) => {
      console.log('-------------', error)
      return { error };
    });
    this.store.on(this.inject, (before, state) => {
      console.log('-------------***', state)
      return { ...state };
    });
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
      console.log(response.data.user)
      this.userLoginSuccess(response.data.user)
      setJWT(response.data.user.token);
      // set cookie with frontend server
      axios.post('/token', { token: response.data.user.token });
    },
    (error) => {
      this.userLoginError(parseError(error))
      setJWT(undefined);
      // clear cookie with frontend server
      axios.post('/token', { token: '' });
    },
  );
};


me({ req }) {
  return request(req, {
    method: 'get',
    url: '/user',
  }).then(
    response => this.userLoginSuccess(response.data.user),
    error => this.userLoginError(parseError(error)),
  );
};


/*export function save({ bio, email, image, username, password }) {
  if (!email || !username) {
    return { type: SAVE_FAILURE, error: { message: 'Empty username or email' } };
  }
  const user = { bio, email, image, username };
  if (password) {
    user.password = password;
  }

  return (dispatch) => {
    dispatch({ type: SAVE_REQUEST });

    return request(undefined, {
      method: 'put',
      url: '/user',
      data: { user },
    }).then(
      response => dispatch({ type: SAVE_SUCCESS, payload: response.data }),
      error => dispatch({ type: SAVE_FAILURE, error: parseError(error) }),
    );
  };
}*/

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
