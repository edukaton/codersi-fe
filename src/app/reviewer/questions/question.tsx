import * as React from 'react';
import { Dispatch } from 'react-redux';
import { Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { IQuestion } from 'dto';
import { IStoreState } from 'store';

interface IProps {
  children: any; // tslint:disable-line:no-any
  dispatch: Dispatch<IStoreState>;
  question: IQuestion;
}

interface IState {
  showExtra: boolean;
}

export class Question extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      showExtra: false,
    };
  }

  render() {
    const { children, question } = this.props;
    return (
      <Card className="question">
        <CardBody>
          <CardTitle>{question.title}</CardTitle>
          <CardSubtitle>{question.description}</CardSubtitle>
        </CardBody>
        <CardBody>
          {children}
        </CardBody>
        <CardBody>
          <Button
            color="link"
            onClick={() => {
              this.setState(({ showExtra }: IState) => ({ showExtra: !showExtra }));
            }}
          >
            {this.state.showExtra ? 'ukryj' : 'jak zdecydować?'}
          </Button>
          {question.extraDescription && this.state.showExtra ? (
            <p>{question.extraDescription}</p>
          ) : null}
        </CardBody>
      </Card>
    );
  }
}
