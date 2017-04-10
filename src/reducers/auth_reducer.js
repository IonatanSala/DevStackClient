import { MY_APPLIED_POSITIONS, AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, REMOVE_AUTH_ERROR, GET_PROFILE } from '../actions/actionTypes';

const defaultState = {
  authenticated: false,
  user: null,
  profile: null,
  myAppliedPositions: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, user: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case REMOVE_AUTH_ERROR:
      return { ...state, error: null };
    case GET_PROFILE:
      return { ...state, profile: action.payload }
    case MY_APPLIED_POSITIONS:
      return { ...state, myAppliedPositions: action.payload };
    default:
      return state;
  }
}
