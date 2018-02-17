export enum QuestionType {
  Binary = 'binary',
  Range = 'range',
  Text = 'text',
}

export interface IQuestion {
  description: string;
  title: string;
  type: QuestionType;
}
