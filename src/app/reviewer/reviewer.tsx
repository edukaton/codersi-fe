import * as React from 'react';
import { connect } from 'react-redux';

import { IStoreState } from '../../store';
import { IReview } from '../../dto';

interface IProps {
  review: IReview;
}

// tslint:disable:max-line-length
class Reviewer extends React.Component<IProps> {
  render() {
    return (
      <section>
        <iframe
          src="http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT"
        />
      </section>
    );
  }
}

// tslint:disable:no-any
export default (connect as any)(
  ({ reviews }: IStoreState) => ({
    review: reviews.get('1'),
  })
)(Reviewer);
