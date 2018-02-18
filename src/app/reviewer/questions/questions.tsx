import * as React from 'react';
import { Card, CardBody, CardTitle, Progress, Table } from 'reactstrap';
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
import { bsColor } from '../../../config';

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
    const score = '31';
    const showResult = !question && answersCount > 0;
    return (
      <aside className={COMPONENT}>
        {showResult ? null : [
          <Card key={0} className={`${COMPONENT}__title-card`}>
            <CardBody>
              <CardTitle>
                Barometr wiarygodności artykułu
              </CardTitle>
            </CardBody>
          </Card>,
          <Card key={1} className={`${COMPONENT}__progress`}>
            <CardBody>
              <Progress
                color={bsColor}
                value={Math.floor(20 + answersCount / questionsCount * 80)}
              >
                {answersCount} / {questionsCount}
              </Progress>
            </CardBody>
          </Card>
        ]}
        {question ? (
          <Question dispatch={this.props.dispatch} question={question}>
            {React.createElement(questionComponents[question.type], {
              dispatch: this.props.dispatch,
              question,
            } )}
          </Question>
        ) : null}
        {showResult ? (
          <Card>
            <CardBody>
              <CardTitle>
                <span style={{ lineHeight: '70px' }}>
                  Twoja ocena:
                  <strong style={{ fontSize: '3em', float: 'right' }}>{score}%</strong>
                </span>
                <Progress color="danger" value={score} />
                <p>
                  Na podstawie Twoich odpowiedzi oszacowaliśmy możliwość, że ten artykuł
                  jest nierzetelny i niewiarygodny.
                  Pamiętaj, że wynik jest tylko zaproszeniem do dyskusji.
                </p>
              </CardTitle>
            </CardBody>
            <CardBody>
              <h5>Podsumowanie</h5>
              <Table style={{ marginTop: '20px' }}>
                <tbody>
                  {this.props.answers.map((answer, i) => {
                    const theQuestion =
                      this.props.questions.find(({ id }) => id === answer.questionId);
                    return (
                      <tr key={i}>
                        <td>{theQuestion.title}</td>
                        <th>
                          {typeof answer.data === 'boolean' ?
                            answer.data ? 'TAK' : 'NIE' :
                            null}
                          {typeof answer.data === 'number' ?
                            `${answer.data}/10` :
                            null}
                          {typeof answer.data === 'string' ?
                            'odp.' :
                            null}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {/*<pre>*/}
                {/*{JSON.stringify(this.props.answers, null, 2)}*/}
              {/*</pre>*/}
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
