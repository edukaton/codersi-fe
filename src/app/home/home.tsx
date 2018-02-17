import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { createReview, loadReview } from '../../actions';
import { IStoreState } from '../../store';
import { IReview } from '../../dto';

import './home.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  reviews: Map<string, IReview>;
}

const COMPONENT = 'home';

export class HomeView extends React.Component<IProps> {
  render() {
    return (
      <section className={`page ${COMPONENT}`}>
        <div className="App">
          <h1>Wiarygodniomierz</h1>
          <button
            onClick={() => {
              this.props.dispatch(createReview('abc'));
            }}
          >
            Create
          </button>
          <button
            onClick={() => {
              this.props.dispatch(loadReview(''));
            }}
          >
            Load
          </button>
          <pre>
            {JSON.stringify(this.props.reviews, null, 2)}
          </pre>
        </div>
      </section>
    );
  }
}

// tslint:disable:no-any
export const Home = (connect as any)(
  ({ reviews }: IStoreState) => ({
    reviews,
  })
)(HomeView);
