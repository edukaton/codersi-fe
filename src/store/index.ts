import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer } from 'reducers';
import { IReview } from 'dto';

export interface IStoreState {
  reviews: Map<string, IReview>;
}

const initialState = {
  reviews: Map(),
};

export const configureStore = () => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);
