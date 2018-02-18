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
            {question.extraDescriptionAlways ?
              null :
              this.state.showExtra ?
                'ukryj' :
                (Boolean(question.extraDescriptionText) ?
                  question.extraDescriptionText :
                  'jak zdecydować?')}
          </Button>
          {((question.extraDescription && this.state.showExtra) ||
            question.extraDescriptionAlways) ? (
              <p>{question.extraDescription}</p>
            ) : null}
        </CardBody>
      </Card>
    );
  }
}
