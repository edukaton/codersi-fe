import * as React from 'react';
import { Button, Input } from 'reactstrap';

import { addAnswer } from 'actions';

import { bsColor } from '../../../config';
import { IQuestionProps } from './config';

interface IState {
  text: string;
}

export class Text extends React.Component<IQuestionProps, IState> {

  constructor(props: IQuestionProps) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    const { dispatch, question } = this.props;
    return (
      <div>
        <Input
          onChange={e => {
            this.setState({ text: e.currentTarget.value });
          }}
          type="textarea"
          value={this.state.text}
        />
        <br/>
        <Button
          color={bsColor}
          onClick={() => {
            dispatch(addAnswer({
              reviewId: question.reviewId,
              questionId: question.id,
              data: this.state.text,
            }));
          }}
        >
          Dalej
        </Button>
      </div>
    );
  }
}
