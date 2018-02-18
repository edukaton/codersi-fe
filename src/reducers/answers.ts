import { Map } from 'immutable';

import { ADD_ANSWER } from '../actions';
import { IAnswer } from '../dto';
import { IAction } from '../model';

export const answersReducer = (
  state: Map<string, IAnswer[]>,
  { type, payload }: IAction,
): Map<string, IAnswer[]> => {
    switch (type) {
      case ADD_ANSWER:
        const reviewAnswers = state.get(payload.reviewId) || [];
        return state.set(payload.reviewId, reviewAnswers.concat(payload));
      default:
        return state || Map<string, IAnswer[]>();
    }
  };
