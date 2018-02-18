import animateScrollTo from 'animated-scroll-to';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import * as uuid from 'uuid';

import { createReview } from '../../actions';
import { IStoreState } from '../../store';
import { bsColor } from '../../config';
import { IReview } from '../../dto';

import './home.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  review: IReview;
}

interface IState {
  url: string;
}

const COMPONENT = 'home';

export class HomeView extends React.Component<IProps, IState> {

  componentWillReceiveProps(newProps: IProps) {
    if (newProps.review && !this.props.review ||
      (newProps.review && newProps.review.url) !== (this.props.review && this.props.review.url) ) {
      setTimeout(
        () => {
          animateScrollTo(window.innerHeight);
        },
        300,
      );
    }
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      url: (props.review && props.review.url) || '',
    };
  }

  render() {
    const { url } = this.state;
    return (
      <section className={`page ${COMPONENT}`} style={{ height: window.innerHeight }}>
        <div className="App">
          <hgroup>
            <h3>Sprawdzaj wiarygodność treści w internecie</h3>
            <h3>Dziel się wnioskami ze znajomymi</h3>
            <h3>Wyjaśniaj i dyskutuj</h3>
          </hgroup>
          {/*http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT*/}
          <Form
            className={`${COMPONENT}__url-form`}
            inline
            onSubmit={e => {
              e.preventDefault();
              const id = uuid.v4();
              this.props.dispatch(createReview(id, url));
              this.props.dispatch(push('#' + id));
              // this.props.dispatch(push('#maLGWznu'));
            }}
          >
            <FormGroup>
              <Input
                className={`${COMPONENT}__url-input`}
                onChange={e => {
                  this.setState({ url: e.currentTarget.value });
                }}
                placeholder="Wklej tutaj link do artykułu, który chcesz sprawdzić"
                type="text"
                value={url}
              />
            </FormGroup>{' '}
            <Button
              className={`${COMPONENT}__action`}
              color={bsColor}
              type="submit"
            >
              Analizuj
            </Button>
          </Form>

          {/*<div style={{ opacity: 0.3 }}>*/}
            {/*<button*/}
              {/*onClick={() => {*/}
                {/*this.props.dispatch(createReview('http://a.pl'));*/}
              {/*}}*/}
            {/*>*/}
              {/*Create*/}
            {/*</button>*/}
            {/*<button*/}
              {/*onClick={() => {*/}
                {/*this.props.dispatch(loadReview('r1'));*/}
              {/*}}*/}
            {/*>*/}
              {/*Load*/}
            {/*</button>*/}
            {/*<pre>*/}
              {/*{JSON.stringify(this.props.review, null, 2)}*/}
            {/*</pre>*/}
          {/*</div>*/}

        </div>
      </section>
    );
  }
}

// tslint:disable:no-any
export const Home = (connect as any)(
  ({ reviews, router }: IStoreState) => ({
    review: reviews.get(router.location.hash.slice(1)),
  })
)(HomeView);
