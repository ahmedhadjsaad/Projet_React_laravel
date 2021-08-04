import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import combineReducers from '../Reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
