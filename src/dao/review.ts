import { IReview, IReviewInput } from '../dto';
import { CRUDDao } from './crud';

class ReviewDao extends CRUDDao<IReviewInput, IReview> {

  constructor(path: string) {
    super(path);
  }

}

export const reviewDao = new ReviewDao('review');
