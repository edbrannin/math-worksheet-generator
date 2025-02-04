const Controls = ({
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
      <div>Rows: {rows}</div>
      <div>Columns: {columns}</div>
    </div>
    <div>
      <h2>Problem Options</h2>
      <div>Operation: {options.operation}</div>
      <div>Min input: {options.minInput}</div>
      <div>Max input: {options.maxInput}</div>
      <div>Rows: {options.inputCount}</div>
    </div>
    <button onClick={onShuffle}>Shuffle</button>
  </div>
);

export default Controls;
