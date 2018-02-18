import { QuestionType } from '../model';

export interface IQuestion {
  description: string;
  id: string;
  reviewId: string;
  title: string;
  type: QuestionType;
}
