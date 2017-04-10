import { CREATE_OPPORTUNITY_APPLICATION } from '../actions/actionTypes';

const initialState = {

}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_OPPORTUNITY_APPLICATION:
      return;
    default:
      return state;
  }
}
