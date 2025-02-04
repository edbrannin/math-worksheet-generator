import { FC } from 'react';
import { MathProblem } from './types';

import './MathProblem.css';

type MathProblemProps = {
  problem: MathProblem
}

const ProblemSign = ({
  operation,
}: {
  operation: MathProblem['operation']
}) => {
  if (operation === 'addition') {
    return (
      <span>+</span>
    );
  }
}

const MathProblemComponent: FC<MathProblemProps> = ({
  problem,
}) => (
  <div className="math-problem">
    {problem.inputs.map((row, i, arr) => {
      const isLastRow = (arr.length === i + 1)
      return (
        <div key={i} className="operand">
          {isLastRow && <ProblemSign operation={problem.operation} />}
          {row}
        </div>
      )
    })}
  </div>
)

export default MathProblemComponent;