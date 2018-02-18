import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Map } from 'immutable';
import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { answersReducer, questionsReducer, reviewsReducer } from 'reducers';
import { IAnswer, IReview } from 'dto';
import { IQuestion } from '../dto';
import { QuestionType } from '../model';

export interface IStoreState {
  answers: Map<string, IAnswer[]>;
  questions: Map<string, IQuestion[]>;
  reviews: Map<string, IReview>;
  router: RouterState;
}

const mockQuestions: IQuestion[] = [
  {
    description: 'przykładowy opis przykładowy opis przykładowy opis, bo wiarygodność domeny to niewiarygodnie ważna sprawa sprawa przykładowy opis przykładowy opis przykładowy opis, bo wiarygodność domeny to niewiarygodnie ważna sprawa sprawa',
    extraDescription: 'dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, najlepiej, żeby to był w miarę prawdziwy tekst, niestety nie jest, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., dodatkowy opis, wyjaśnie itd., ',
    id: 'q1',
    reviewId: 'maLGWznu',
    title: 'Wiarygodna domena?',
    type: QuestionType.Binary,
  },
  {
    description: 'wybór wartości na skali wybór wartości na skali wybór wartości na skali (0 - zupełnie niesensacyjne, 10 - skrajnie sensacyjne)',
    id: 'q1',
    reviewId: 'maLGWznu',
    title: 'Oceń sensacyjność',
    type: QuestionType.Range,
    rangeDescription: {
      0: 'zupełnie niesensacyjne',
      10: 'skrajnie sensacyjne',
    }
  },
  {
    description: 'skomentowanie skomentowanie skomentowanie',
    id: 'q1',
    reviewId: 'maLGWznu',
    title: 'Skomentuj coś',
    type: QuestionType.Text,
  },
];

const mockReviews = Map<string, IReview>([
  ['maLGWznu', {
    id: 'maLGWznu',
    url: 'http://wiadomosci.gazeta.pl/wiadomosci/7,114883,23036572,duda-gratuluje-stochowi-medalu-piekny-prezent-na-100-lecie.html#Z_MT',
  }]
]);

const initialState = {
  answers: Map(),
  // reviews: Map(),
  reviews: mockReviews,
  // questions: Map(),
  questions: Map([
    ['maLGWznu', mockQuestions],
  ])
};

export const history = createBrowserHistory();

export const configureStore = () => createStore(
  connectRouter(history)(combineReducers({
    answers: answersReducer,
    questions: questionsReducer,
    reviews: reviewsReducer,
    routing: routerReducer,
  })),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);
