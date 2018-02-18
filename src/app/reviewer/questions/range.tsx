import * as React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import { addAnswer } from '../../../actions';
import { IQuestionProps } from './config';

export function Range({ dispatch, question }: IQuestionProps) {
  return (
    <ButtonGroup>
      {Array.apply(null, {length: 11}).map(Number.call, Number).map((i: number) => (
        <Button
          key={i}
          onClick={() => {
            dispatch(addAnswer({
              reviewId: question.reviewId,
              questionId: question.id,
              data: i,
            }));
          }}
          size="sm"
        >
          {i}
        </Button>
      ))}
    </ButtonGroup>
  );
}
