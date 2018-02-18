import * as React from 'react';
import { Card, CardBody, CardTitle, Progress, Table } from 'reactstrap';
import * as FontAwesome from 'react-fontawesome';
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
    const score = '31';
    const showResult = !question && answersCount > 0;
    return (
      <aside className={COMPONENT}>
        {showResult ? null : [
          <Card key={0} className={`${COMPONENT}__title-card`}>
            <CardBody>
              <CardTitle style={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
                Miernik Prawdy
              </CardTitle>
            </CardBody>
          {/*</Card>,*/}
          {/*<Card key={1} className={`${COMPONENT}__progress`}>*/}
            <CardBody>
              <Progress
                color="info"
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
          <Card style={{ background: '#ddd' }}>
            <CardBody>
              <CardTitle>
                <span style={{ lineHeight: '70px' }}>
                  Wiarygodność artykułu:
                  <strong style={{ fontSize: '3em', float: 'right' }}>{score}%</strong>
                </span>
                <Progress
                  className="result-progress-bar"
                  color="danger"
                  value={score}
                  style={{ height: '30px' }}
                />
                <br />
                <p style={{ fontSize: '16px' }}>
                  Na podstawie odpowiedzi oszacowaliśmy, że artykuł
                  jest mało wiarygodny.
                  Pamiętaj, że wynik jest tylko zaproszeniem do dyskusji.
                </p>
              </CardTitle>
            </CardBody>
            <CardBody>
              <h3 style={{ fontSize: '18px' }}>Podziel się wynikiem i dyskutuj</h3>
              <p>
                Skopiuj link i wyślij do siebie lub znajomego:<br/>
                <mark>{window.location.href}</mark>
              </p>
              <p>
                Podziel się <br/>
                <FontAwesome name="facebook-square" size="2x" /> {' '}
                <FontAwesome name="twitter" size="2x" /> {' '}
                <FontAwesome name="envelope" size="2x" /> {' '}
              </p>
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
    answers: answers.get('maLGWznu') || [],
    questions: questions.get('maLGWznu') || [],  // HARDCODED
  })
)(QuestionsView);
