import { IStoreState } from '../store';
import { LOAD_REVIEW_SUCCESS } from '../actions';
import { IAction } from '../model';

export const rootReducer = (state: IStoreState, { type, payload }: IAction): IStoreState => {
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
