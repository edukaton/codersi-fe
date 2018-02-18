import { Map } from 'immutable';

import { IQuestion } from '../dto';
import { IAction } from '../model';

export const questionsReducer = (
  state: Map<string, IQuestion[]>,
  { type, payload }: IAction,
): Map<string, IQuestion[]> => {
  switch (type) {
    default:
      return state || Map<string, IQuestion[]>();
  }
};
