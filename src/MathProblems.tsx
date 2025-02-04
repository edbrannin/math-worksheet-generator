import { MathProblem as MathProblemType } from './types'
import './MathProblems.css'
import { FC } from 'react';
import MathProblemComponent from './MathProblem';

type MathProblemsProps = {
  rows: number;
  cols: number;
  problems: MathProblemType[];
}

const MathProblems: FC<MathProblemsProps> = ({
  rows,
  cols,
  problems
}) => (
  <div className="math-problem-set" style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr);`
  }}>
    {problems.map((problem) => (
      <div className="math-problem" key={problem.id}>
        <MathProblemComponent problem={problem} />
      </div>
    ))}
  </div>
)

export default MathProblems;