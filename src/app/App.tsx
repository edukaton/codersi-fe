import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { loadReview } from '../actions';
import { IReview } from '../dto';
import { IStoreState } from '../store';

import './App.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  reviews: Map<string, IReview>;
}

class App extends React.Component<IProps> {
  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.props.dispatch(loadReview('1'));
          }}
        >
          Load
        </button>
        <pre>
          {JSON.stringify(this.props.reviews, null, 2)}
        </pre>
      </div>
    );
  }
}

// tslint:disable:no-any
export default (connect as any)(
  ({ reviews }: IStoreState) => ({
    reviews,
  })
)(App);
