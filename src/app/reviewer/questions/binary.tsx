import * as React from 'react';
import { Button } from 'reactstrap';

import { IQuestionProps } from './config';
import { addAnswer } from '../../../actions';

export function Binary({ dispatch, question }: IQuestionProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="success"
        disabled={question.id === 'qi1'}
        onClick={() => {
          dispatch(addAnswer({
            reviewId: question.reviewId,
            questionId: question.id,
            data: true,
          }));
        }}
        style={{ width: '100px' }}
      >
        Tak
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
        style={{ width: '100px', marginLeft: '10px' }}
      >
        Nie
      </Button>
    </div>
  );
}
