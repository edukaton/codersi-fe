import { IStoreState } from '../store';

import { LOAD_REVIEW_SUCCESS } from '../actions';

export const rootReducer = (state: IStoreState, { type, payload }): IStoreState => {
  switch (type) {
    case LOAD_REVIEW_SUCCESS:
      return Object.assign({}, {
        ...state,
        reviews: state.reviews.set(payload.id, payload.review),
      });
    default:
      return state;
  }
};
