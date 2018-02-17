import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IStoreState } from 'store';
import { IQuestion, QuestionType } from 'model';

import { COMPONENT } from '../config';
import { Question } from './question';

import { Binary } from './binary';
import { Range } from './range';
import { Text } from './text';

import './questions.css';

interface IProps {
  dispatch: Dispatch<IStoreState>;
}

export const questions: IQuestion[] = [
  {
    description: 'przykładowy opis przykładowy opis przykładowy opis ',
    title: 'Wiarygodna domena?',
    type: QuestionType.Binary,
  },
  {
    description: 'wybór wartości na skali wybór wartości na skali wybór wartości na skali',
    title: 'Oceń sensacyjność',
    type: QuestionType.Range,
  },
  {
    description: 'skomentowanie skomentowanie skomentowanie',
    title: 'Skomentuj coś',
    type: QuestionType.Text,
  },
];

const questionComponents = {
  [QuestionType.Binary]: Binary,
  [QuestionType.Range]: Range,
  [QuestionType.Text]: Text,
};

export class QuestionsView extends React.Component<IProps> {
  render() {
    return (
      <aside className={`${COMPONENT}__questions`}>
        <h2>Questions</h2>
        {questions.map((question, i) => (
          <Question key={i} question={question}>
            {React.createElement(questionComponents[question.type], { question })}
          </Question>
        ))}
        {/*<pre>{JSON.stringify(questions, null, 2)}</pre>*/}
      </aside>
    );
  }
}

// tslint:disable:no-any
export const Questions = (connect as any)()(QuestionsView);
