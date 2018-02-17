import * as React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { IQuestion } from 'model';

interface IProps {
  children: any; // tslint:disable-line:no-any
  question: IQuestion;
}

export function Question({ children, question }: IProps) {
  return (
    <Card className="question">
      <CardBody>
        <CardTitle>{question.title}</CardTitle>
        <CardSubtitle>{question.description}</CardSubtitle>
      </CardBody>
      <CardBody>
        {children}
        {/*<pre>{JSON.stringify(question, null, 2)}</pre>*/}
      </CardBody>
    </Card>
  );
}
