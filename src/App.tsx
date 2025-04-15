import { useState } from 'react'

import './App.css'
import Controls from './Controls'
import useGetProblems from './useGetProblems'
import { ProblemOptions } from './types'
import MathProblems from './MathProblems'

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
  const [rows, setRows] = useState(8)
  const [cols, setCols] = useState(7)
  const [options, setOptions] = useState<ProblemOptions>(DEFAULT_OPTIONS)

  const problems = useGetProblems(rows * cols, options)

  return (
    <>
      <div className="no-print">
        <h1>Math Worksheet Generator</h1>
        <p>(This box won't appear when you print)</p>
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
      <MathProblems rows={rows} cols={cols} problems={problems} />
    </>
  )
}

export default App
