import animateScrollTo from 'animated-scroll-to';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import { createReview, loadReview } from '../../actions';
import { IStoreState } from '../../store';
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
    if (newProps.review && !this.props.review) {
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
      url: '',
    };
  }

  render() {
    // const { url } = this.state;
    return (
      <section className={`page ${COMPONENT}`} style={{ height: window.innerHeight }}>
        <div className="App">
          <h1>Wiarygodniomierz</h1>

          <Form
            className={`${COMPONENT}__url-form`}
            inline
            onSubmit={e => {
              e.preventDefault();
              // this.props.dispatch(createReview(url));
              this.props.dispatch(push('#maLGWznu'));
            }}
          >
            <FormGroup>
              <Input
                className={`${COMPONENT}__url-input`}
                onChange={e => {
                  this.setState({ url: e.currentTarget.value });
                }}
                placeholder="wklej adres URL do artykułu"
                type="text"
              />
            </FormGroup>{' '}
            <Button
              className={`${COMPONENT}__action`}
              color="success"
              type="submit"
            >
              Analizuj
            </Button>
          </Form>

          <div style={{ opacity: 0.3 }}>
            <button
              onClick={() => {
                this.props.dispatch(createReview('http://a.pl'));
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                this.props.dispatch(loadReview('r1'));
              }}
            >
              Load
            </button>
            <pre>
              {JSON.stringify(this.props.review, null, 2)}
            </pre>
          </div>
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
