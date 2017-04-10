import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, REMOVE_AUTH_ERROR } from './actionTypes';

const API_URL = 'http://localhost:8000';

export function signUpUser({email, password, isEmployer}) {
  let newUser = {
    email,
    password
  };

  (isEmployer === "true") ? newUser.isEmployer = true : newUser.isEmployer = false;
  return function(dispatch) {
    axios.post(`${API_URL}/users`, newUser)
      .then((res) => {
        // update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: res.data });
        // save the JWT token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isEmployer', res.data.isEmployer);
        // redirect to /dashboard
        browserHistory.push('/dashboard');
      })
      .catch((response) => {
        dispatch(authError(response.response.data.error));
      });
  }
}

export function signInUser({email, password}) {
  // get direct access to dispatch
  return function(dispatch) {
    // submit email/password to server
    axios.post(`${API_URL}/auth`, {email, password})
      .then((res) => {
        const userData = {
          email: res.data.email,
          isEmployer: res.data.isEmployer
        };
        // update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: userData });
        // save the JWT token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isEmployer', res.data.isEmployer);
        // redirect to /dashboard
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        // show error message
        dispatch(authError('Email or Password is incorrect.'));
      })
    ;
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function removeAuthError() {
  return {
    type: REMOVE_AUTH_ERROR
  }
}

export function signOutUser() {
  // remove token from localstorage
  localStorage.removeItem('token');
  localStorage.removeItem('isEmployer');
  // let app know user is logged out
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then((res) => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data
        });
      })
      .catch((res) => {
        console.log(res.response);
      });
  }
}
