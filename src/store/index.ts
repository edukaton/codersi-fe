import { Map } from 'immutable';
import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reviewsReducer } from 'reducers';
import { IReview } from 'dto';

export interface IStoreState {
  reviews: Map<string, IReview>;
}

const initialState = {
  reviews: Map(),
};

export const configureStore = () => createStore(
  combineReducers({
    reviews: reviewsReducer,
    routing: routerReducer
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);
