import axios from 'axios';
import { browserHistory } from 'react-router';
import { message } from 'antd';
import { IS_CREATOR, CREATE_OPPORTUNITY, GET_OPPORTUNITIES, GET_OPPORTUNITY, GET_MY_OPPORTUNITIES, CURRENT_OPPORTUNITY_TO_NULL, CREATOR_TO_FALSE } from './actionTypes';
const apiEndpoint = 'http://localhost:8000/opportunities';

export function createOpportunity(opportunity) {
  opportunity = { ...opportunity, salary: opportunity.salary * 100 }
  return dispatch => {
    axios.post(apiEndpoint, opportunity, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(data => {
      console.log(data);
      browserHistory.push('/dashboard/opportunities');
    })
    .catch(err => {
      console.log(err);
    })

  };
}

export function getMyOpportunities() {
  return dispatch => {
    axios.get(`${apiEndpoint}/myOpportunities`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then((res) => {
      dispatch({
        type: GET_MY_OPPORTUNITIES,
        payload: res.data
      })
    });
  }
}

export function getOpportunities() {
  return dispatch => {
    axios.get(apiEndpoint)
    .then((res) => {
      dispatch({
        type: GET_OPPORTUNITIES,
        payload: res.data
      })
    })
  }
}

export function getOpportunity(id) {
  return dispatch => {
    axios.get(`${apiEndpoint}/${id}`)
    .then((res) => {
      dispatch({
        type: GET_OPPORTUNITY,
        payload: res.data
      });
    });
  }
}

export function isLoggedInUserOwner(opportunityID) {

}

export function updateOpportunity(opportunity) {

  const id = opportunity._id;
  const newOpportunity = { opportunity: { ...opportunity }};
  newOpportunity._id = id;

  return dispatch => {
    axios.put(`${apiEndpoint}/${id}`, newOpportunity, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      message.success('Your job listing was saved');
    })
    .catch(err => {
      message.error('Something went wrong, please try again.');
    })
  }

}

export function setCurrentOpportunityToNull() {
  return {
    type: CURRENT_OPPORTUNITY_TO_NULL
  };
}

export function isOpportunityCreator(id) {
  return dispatch => {
    axios.get(`${apiEndpoint}/isCreator/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      if(res.data.isCreator) {
        dispatch({
          type: IS_CREATOR,
          payload: true
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export function removeOpportunity(id) {

  return dispatch => {
    axios.delete(`${apiEndpoint}/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      message.success('Listing removed');
      console.log(browserHistory);
      browserHistory.replace('/dashboard/opportunities');
    })
    .catch(err => {
      message.error('There was a problem removing your listing');
    })
  }
}

export function setCreatorToFalse() {
  return {
    type: CREATOR_TO_FALSE
  };
}
