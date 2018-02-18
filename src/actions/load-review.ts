import { Dispatch } from 'react-redux';

import { reviewDao } from '../dao';
import { IStoreState } from 'store';

export const LOAD_REVIEW_SUCCESS = 'LOAD_REVIEW_SUCCESS';

export const loadReview = (id: string) => (dispatch: Dispatch<IStoreState>) =>
  reviewDao.get(id)
    .then(review => {
      dispatch({
        type: LOAD_REVIEW_SUCCESS,
        payload: { id, review },
      });
    });
