import { IReview, IReviewInput } from '../dto';
import { CRUDDao } from './crud';

class ReviewDao extends CRUDDao<IReviewInput, IReview> {

  constructor(path: string) {
    super(path);
  }

  public get(id: string): Promise<IReview> {
    return Promise.resolve({
      // tslint:disable-next-line
      url: 'http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT',
    });
  }

}

export const reviewDao = new ReviewDao('review');
