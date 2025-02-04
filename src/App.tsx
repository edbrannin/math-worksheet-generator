import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Controls from './Controls'

type AdditionProblemOptions = {
  operation: 'addition';

  maxSum: number;
  minSum: number;

  maxInput: number;
  minInput: number;
  inputCount: number;
}

type ProblemOptions = (AdditionProblemOptions) & {
  shuffleCount: number;
};

type MathProblem = {
  operation: 'addition';
  inputs: number[];

  id?: number;
  solution?: number;
}

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
    setProblems(allProblems.filter((_, i) => usedProblems.has(i)));
  }, [allProblems, count, options.shuffleCount])
  return problems;
}

const DEFAULT_OPTIONS: ProblemOptions = {
  shuffleCount: 0,
  operation: 'addition',

  maxSum: 11,
  minSum: 0,

  maxInput: 20,
  minInput: 0,
  inputCount: 2,
};

function App() {
  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(6)
  const [options, setOptions] = useState<ProblemOptions>(DEFAULT_OPTIONS)

  const problems = useGetProblems(rows * cols, options)

  return (
    <>
      <div className="no-print">
        <h1>Math Worksheet Generator</h1>
        <Controls
          columns={cols}
          setColumns={setCols}
          rows={rows}
          setRows={setRows}
          options={options}
          setOptions={setOptions}
          onShuffle={() => setOptions({ ...options, shuffleCount: options.shuffleCount + 1 })}
        />
        Shuffle count: {options.shuffleCount}
      </div>
      <div>
        {problems.map((problem) => (
          <div className="problem" key={problem.id}>
            {problem.inputs.join(' + ')}
            {' = '}
            {problem.solution}
          </div>
        ))}
      </div>
      <div className="card">
        <p>
        
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
