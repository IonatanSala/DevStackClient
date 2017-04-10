import { STORY_TO_NULL, GET_STORY, GET_STORIES } from '../actions/actionTypes';

const initialState = {
  all: null,
  current: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES:
      return { ...state, all: action.all }
    case GET_STORY:
      return { ...state, current: action.story }
    case STORY_TO_NULL:
      return { ...state, current: null }
    default:
      return state;
  }
}
