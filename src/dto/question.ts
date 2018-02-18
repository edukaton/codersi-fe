import { QuestionType } from '../model';

export interface IQuestion {
  description: string;
  extraDescription?: string;
  extraDescriptionAlways?: boolean;
  extraDescriptionText?: string;
  id: string;
  points?: number;
  pointsMultiplier?: number;
  rangeDescription?: object;
  reviewId: string;
  skipDesc?: string;
  skipNo?: number;
  title: string;
  type: QuestionType;
}
