import * as React from 'react';
import { connect } from 'react-redux';

import { IStoreState } from '../../store';
import { IReview } from '../../dto';

import { Questions } from './questions';
import { COMPONENT } from './config';

interface IProps {
  review: IReview;
}

import './reviewer.css';

// tslint:disable:max-line-length
class ReviewerView extends React.Component<IProps> {
  render() {
    return (
      <section className={`page ${COMPONENT}`}>
        {/*<iframe*/}
          {/*className={`${COMPONENT}__source`}*/}
          {/*src="http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT"*/}
        {/*/>*/}
        <Questions />
      </section>
    );
  }
}

// tslint:disable:no-any
export const Reviewer = (connect as any)(
  ({ reviews }: IStoreState) => ({
    review: reviews.get('1'),
  })
)(ReviewerView);
