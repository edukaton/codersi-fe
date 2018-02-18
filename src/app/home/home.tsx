import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import { createReview, loadReview } from '../../actions';
import { IStoreState } from '../../store';
import { IReview } from '../../dto';

import './home.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
  reviews: Map<string, IReview>;
}

interface IState {
  url: string;
}

const COMPONENT = 'home';

export class HomeView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      url: '',
    };
  }

  render() {
    const { url } = this.state;
    return (
      <section className={`page ${COMPONENT}`}>
        <div className="App">
          <h1>Wiarygodniomierz</h1>

          <Form
            className={`${COMPONENT}__url-form`}
            inline
            onSubmit={e => {
              e.preventDefault();
              this.props.dispatch(createReview(url));
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
