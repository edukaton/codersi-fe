import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { IReview } from '../dto';
import { IStoreState } from '../store';

import { About } from './about';
import { Home } from './home';
import { Reviewer } from './reviewer';

import './App.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  review: IReview;
}

// const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component<IProps> {
  render() {
    return (
      <Router>
        <div>
          <Home />
          {this.props.review ? <Reviewer /> : null}
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

// tslint:disable:no-any
export default (connect as any)(
  ({ reviews, router }: IStoreState) => ({
    review: reviews.get(router.location.hash.slice(1)),
  })
)(App);
