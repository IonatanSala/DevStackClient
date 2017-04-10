import axios from 'axios';
import { CREATE_OPPORTUNITY_APPLICATION } from './actionTypes';
const apiEndpoint = 'http://localhost:8000/opportunityApplication'

export function createOpportunityApplication(opportunityID) {
  return dispatch => {

    axios.post(`${apiEndpoint}`, { opportunityID }, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      console.log('Created OA', res);
    })
    .catch(err => {
      console.log('Error in OA', err);
    })
  }
}
