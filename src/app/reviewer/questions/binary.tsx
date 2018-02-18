import * as React from 'react';
import { Button } from 'reactstrap';

import { IQuestionProps } from './config';
import { addAnswer } from '../../../actions';

export function Binary({ dispatch, question }: IQuestionProps) {
  return (
    <div>
      <Button
        color="danger"
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
      {' '}
      <Button
        color="success"
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
    </div>
  );
}
