
import {createStore, createEvent} from 'effector'
import axios from 'axios'
import { request, setJWT } from '../agent';
import { parseError } from '../utils';

export const userStore = createStore({});
const userLoginSuccess = createEvent('user:login:success')
const userLoginError = createEvent('user:login:error')
userStore.on(userLoginSuccess, (before, user) => {
  console.log('+++++++++++++', user)
  return { user }
});
userStore.on(userLoginError, (before, error) => {
  console.log('-------------', error)
  return { error }
});


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

export function login({ email, password }) {
  return request(undefined, {
    method: 'post',
    url: '/users/login',
    data: { user: { email, password } },
  }).then(
    (response) => {
      console.log(response.data.user)
      userLoginSuccess(response.data.user)
      setJWT(response.data.user.token);
      // set cookie with frontend server
      axios.post('/token', { token: response.data.user.token });
    },
    (error) => {
      userLoginError(parseError(error))
      setJWT(undefined);
      // clear cookie with frontend server
      axios.post('/token', { token: '' });
    },
  );
};


/*export function me({ req }) {
  return (dispatch) => {
    dispatch({ type: USER_REQUEST });

    return request(req, {
      method: 'get',
      url: '/user',
    }).then(
      response => dispatch({ type: USER_SUCCESS, payload: response.data }),
      error => dispatch({ type: USER_FAILURE, error: parseError(error) }),
    );
  };
}*/

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
