import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import auth from './auth_reducer';
import story from './stories_reducer';
import opportunities from './opportunities_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  story,
  opportunities
});

export default rootReducer;
