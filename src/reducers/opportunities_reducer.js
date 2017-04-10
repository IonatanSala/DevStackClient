import { CREATOR_TO_FALSE, IS_CREATOR, GET_OPPORTUNITY, GET_OPPORTUNITIES, GET_MY_OPPORTUNITIES, CURRENT_OPPORTUNITY_TO_NULL } from '../actions/actionTypes';

const initialState = {
  all: [],
  current: {},
  myOpportunities: [],
  isCreator: false
};

export default function opportunitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OPPORTUNITIES:
      return { ...state, all: action.payload };
    case GET_OPPORTUNITY:
      return { ...state, current: action.payload };
    case GET_MY_OPPORTUNITIES:
      return { ...state, myOpportunities: action.payload };
    case CURRENT_OPPORTUNITY_TO_NULL:
      return { ...state, current: {} };
    case IS_CREATOR:
      return { ...state, isCreator: action.payload }
    case CREATOR_TO_FALSE:
      return { ...state, isCreator: false };
    default:
      return state;
  }
}
