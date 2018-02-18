import { IAnswer } from '../dto';

export const ADD_ANSWER = 'ADD_ANSWER';

export const addAnswer = (answer: IAnswer) => ({
  type: ADD_ANSWER,
  payload: answer,
});
