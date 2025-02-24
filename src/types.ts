export type AdditionProblemOptions = {
  operation: 'addition';

  maxSum: number;
  minSum: number;

  maxInput: number;
  minInput: number;
  inputCount: number;
}

export type ProblemOptions = (AdditionProblemOptions) & {
  shuffleCount: number;
};

export type MathProblem = {
  operation: 'addition';
  inputs: number[];

  id?: number;
  solution?: number;
}

export type Setter<T> = (val: T) => void;
