import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
// import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { syncHistoryWithStore } from 'react-router-redux';

import { IStoreState } from '../store';

import { About } from './about';
import { Home } from './home';
import { Reviewer } from './reviewer';

import './App.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
}

// const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component<IProps> {
  render() {
    return (
      <Router>
        <div>
          <Home />
          <Reviewer />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

// tslint:disable:no-any
export default (connect as any)()(App);
