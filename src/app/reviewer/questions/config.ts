import { Dispatch } from 'react-redux';

import { IQuestion } from '../../../dto';
import { IStoreState } from '../../../store';

export interface IQuestionProps {
  dispatch: Dispatch<IStoreState>;
  question: IQuestion;
}
