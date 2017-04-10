import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from '../actions/actionTypes'
import { getUserDetails } from '../actions/user';
import reducers from '../reducers';

const configureStore = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const store = createStoreWithMiddleware(reducers);

  const token = localStorage.getItem('token');

  if(token) {
    store.dispatch({type: AUTH_USER});
    store.dispatch(getUserDetails());
  }

  return store;
}

export default configureStore;
