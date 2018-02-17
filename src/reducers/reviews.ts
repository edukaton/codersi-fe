import { Map } from 'immutable';

import { LOAD_REVIEW_SUCCESS } from '../actions';
import { IReview } from '../dto';
import { IAction } from '../model';

export const reviewsReducer = (
  state: Map<string, IReview>,
  { type, payload }: IAction,
): Map<string, IReview> => {
    switch (type) {
      case LOAD_REVIEW_SUCCESS:
        return state.set(payload.id, payload.review);
      default:
        return state || Map<string, IReview>();
    }
  };
