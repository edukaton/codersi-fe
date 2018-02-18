import * as React from 'react';
import { Dispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { IQuestion } from 'dto';
import { IStoreState } from 'store';

interface IProps {
  children: any; // tslint:disable-line:no-any
  dispatch: Dispatch<IStoreState>;
  question: IQuestion;
}

export function Question({ children, dispatch, question }: IProps) {
  return (
    <Card className="question">
      <CardBody>
        <CardTitle>{question.title}</CardTitle>
        <CardSubtitle>{question.description}</CardSubtitle>
      </CardBody>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}
