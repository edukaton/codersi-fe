import * as React from 'react';
import { Card, CardBody, CardTitle, Progress } from 'reactstrap';
import { connect, Dispatch } from 'react-redux';

import { IAnswer, IQuestion } from 'dto';
import { QuestionType } from 'model';
import { IStoreState } from 'store';

import { COMPONENT as PARENT_COMPONENT } from '../config';
import { Question } from './question';

import { Binary } from './binary';
import { Range } from './range';
import { Text } from './text';

import './questions.css';

interface IProps {
  answers: IAnswer[];
  dispatch: Dispatch<IStoreState>;
  questions: IQuestion[];
}

const questionComponents = {
  [QuestionType.Binary]: Binary,
  [QuestionType.Range]: Range,
  [QuestionType.Text]: Text,
};

const COMPONENT = `${PARENT_COMPONENT}__questions`;

export class QuestionsView extends React.Component<IProps> {
  render() {
    console.log('QuestionsView', this.props.questions, this.props.answers);
    const answersCount = this.props.answers.length;
    const questionsCount = this.props.questions.length;
    const question = this.props.questions[answersCount];
    return (
      <aside className={COMPONENT}>
        <Card className={`${COMPONENT}__progress`}>
          <CardBody>
            <Progress value={Math.floor(20 + answersCount / questionsCount * 80)}>
              {answersCount} / {questionsCount}
            </Progress>
          </CardBody>
        </Card>
        {question ? (
          <Question dispatch={this.props.dispatch} question={question}>
            {React.createElement(questionComponents[question.type], {
              dispatch: this.props.dispatch,
              question,
            } )}
          </Question>
        ) : null}
        {!question && answersCount > 0 ? (
          <Card>
            <CardBody>
              <CardTitle>Wynik</CardTitle>
            </CardBody>
          </Card>
        ) : null}
      </aside>
    );
  }
}

// tslint:disable:no-any
export const Questions = (connect as any)(
  ({ answers, questions, router }: IStoreState) => ({
    answers: answers.get(router.location.hash.slice(1)) || [],
    questions: questions.get(router.location.hash.slice(1)) || [],
  })
)(QuestionsView);
