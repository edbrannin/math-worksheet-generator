import { FC } from "react"

type NumberInputProps = {
  value: number;
  setValue: (v: number) => void;
  name: String;
};

const NumberInput: FC<NumberInputProps> = ({
  value,
  setValue,
  name
}) => (
  <label>
    {name}:
    {' '}
    <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
  </label>
)

export default NumberInput;