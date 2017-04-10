import axios from 'axios';
import { message } from 'antd';
import { MY_APPLIED_POSITIONS, AUTH_USER, GET_PROFILE } from './actionTypes';
const apiEndpoint = "http://localhost:8000/users";

export function getUserDetails() {
  return dispatch => {
    axios.get(`${apiEndpoint}/details`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((res) => {
      dispatch({type: AUTH_USER, payload: res.data});
    });
  }
}

export function getProfile() {
  return dispatch => {
    axios.get(`${apiEndpoint}/getProfile`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function updateProfile(profile) {
  return dispatch => {
    axios.put(`${apiEndpoint}`, profile, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      message.success('Profile Updated')
      console.log(res)
      console.log('Updated');
    })
    .catch(err => {
      message.error('Something went wrong, please try again.')
      console.log(err);
    })
  }
}

export function getMyAppliedPositions() {
  return async dispatch => {
    let response;
    try {
      response = await axios.get(`${apiEndpoint}/my-applied-positions`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      });
    } catch(e) {

    }

    const { data } = response;
    dispatch({ type: MY_APPLIED_POSITIONS, payload: data });
  }
}
