import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
// import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { syncHistoryWithStore } from 'react-router-redux';

import { createReview, loadReview } from '../actions';
import { IReview } from '../dto';
import { IStoreState } from '../store';

import { About } from './about';
import { Home } from './home';

import './App.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  reviews: Map<string, IReview>;
}

// const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component<IProps> {
  render() {
    return (
      <Router>
        <div>
          <Home />
          <div className="App">
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
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

// tslint:disable:no-any
export default (connect as any)(
  ({ reviews }: IStoreState) => ({
    reviews,
  })
)(App);
