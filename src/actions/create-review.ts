import { Dispatch } from 'react-redux';

import { reviewDao } from '../dao';
import { IStoreState } from 'store';

export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';

export const createReview = (url: string) => (dispatch: Dispatch<IStoreState>) => {
  reviewDao.create({ url })
    .then(review => {
      console.log(CREATE_REVIEW_SUCCESS, review);
      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: { url, review },
      });
    });
};
