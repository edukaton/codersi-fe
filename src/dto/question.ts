import { QuestionType } from '../model';

export interface IQuestion {
  description: string;
  extraDescription?: string;
  id: string;
  rangeDescription?: object;
  reviewId: string;
  title: string;
  type: QuestionType;
}
