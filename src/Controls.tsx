import { FC } from "react";
import NumberInput from "./NumberInput";
import { ProblemOptions, Setter } from './types';


type ControlsProps = {
  rows: number;
  columns: number;
  options: ProblemOptions;
  setRows: Setter<number>;
  setColumns: Setter<number>;
  setOptions: Setter<ProblemOptions>;
  onShuffle: () => void,
}

const Controls: FC<ControlsProps> = ({
  rows,
  columns,
  options,
  setRows,
  setColumns,
  setOptions,
  onShuffle,
}) => (
  <div>
    <div>
      <h2>Page Options</h2>
      <div><NumberInput name="Rows" value={rows} setValue={setRows} /></div>
      <div><NumberInput name="Columns" value={columns} setValue={setColumns} /></div>
    </div>
    <div>
      <h2>Problem Options</h2>
      <div>Operation: {options.operation}</div>
      <div><NumberInput name="Min Operand" value={options.minInput} setValue={val => setOptions({...options, minInput: val })} /></div>
      <div><NumberInput name="Max Operand" value={options.maxInput} setValue={val => setOptions({...options, maxInput: val })} /></div>
      <div><NumberInput name="Operands" value={options.inputCount} setValue={val => setOptions({...options, inputCount: val })} /></div>
      <div><NumberInput name="Min Sum" value={options.minSum} setValue={val => setOptions({...options, minSum: val })} /></div>
      <div><NumberInput name="Max Sum" value={options.maxSum} setValue={val => setOptions({...options, maxSum: val })} /></div>
    </div>
    <button onClick={onShuffle}>Shuffle</button>
  </div>
);

export default Controls;
