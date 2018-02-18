import * as React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import { IQuestionProps } from './config';
import { addAnswer } from '../../../actions';

export function Binary({ dispatch, question }: IQuestionProps) {
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          dispatch(addAnswer({
            reviewId: question.reviewId,
            questionId: question.id,
            data: false,
          }));
        }}
      >
        Nie
      </Button>
      <Button
        onClick={() => {
          dispatch(addAnswer({
            reviewId: question.reviewId,
            questionId: question.id,
            data: false,
          }));
        }}
      >
        Tak
      </Button>
    </ButtonGroup>
  );
}
