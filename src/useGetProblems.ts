import { useEffect, useState } from 'react'
import shuffle from 'lodash/shuffle';

import { AdditionProblemOptions, MathProblem, ProblemOptions } from './types'

// Adapted from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
const arrayRange = (start: number, stop: number, step=1): number[] =>
  Array.from(
  { length: (stop - start) / step + 1 },
  (_, index) => start + index * step
  );

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

const solve = (problem: MathProblem) => {
  if (problem.operation == 'addition') {
    return problem.inputs.reduce((a, b) => a + b, 0);
  }
  throw Error(`Unexpected operation: ${problem.operation}`);
}

const allAdditionProblems = ({ maxInput, minInput, inputCount}: AdditionProblemOptions): MathProblem[] => {
  const validInputs = arrayRange(minInput, maxInput);
  // First row is implicit
  const rowInputs = arrayRange(1, inputCount).map(() => validInputs);
  return cartesian(...rowInputs).map((inputs: number[]) => ({ inputs, operation: 'addition' }))
}

const useGetProblems = (count: number, options: ProblemOptions) => {
  const [problems, setProblems] = useState<MathProblem[]>([]); 
  const [allProblems, setAllProblems] = useState<MathProblem[]>([]);
  useEffect(() => {
    setAllProblems(
      allAdditionProblems(options)
        .map((problem, i) => ({ ...problem, solution: solve(problem), id: i }))
        .filter(({ solution }) => solution >= options.minSum && solution <= options.maxSum)
    );
  }, [options.maxInput, options.minInput, options.maxSum, options.minSum])

  useEffect(() => {
    if (allProblems.length <= count) {
      setProblems(allProblems);
      return;
    }

    const usedProblems = new Set();
    while (usedProblems.size < count) {
      const index = Math.floor(Math.random() * allProblems.length);
      if (!usedProblems.has(index)) {
        usedProblems.add(index);
      }
    }
    setProblems(shuffle(allProblems.filter((_, i) => usedProblems.has(i))));
  }, [allProblems, count, options.shuffleCount])
  return problems;
}

export default useGetProblems;