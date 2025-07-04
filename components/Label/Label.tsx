import { ChangeEvent } from 'react';

interface LabelProps {
  id: string;
  color: string;
  name: string;
  handleLabelCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  selectable?: boolean;
  selected?: boolean;
}

export const Label = ({
  id,
  color,
  name,
  handleLabelCheck,
  selectable,
  selected,
}: LabelProps) => {
  return (
    <label
      key={id}
      htmlFor={id}
      style={{ backgroundColor: color }}
      className="p-2 rounded"
    >
      {selectable && (
        <input
          value={id}
          id={id}
          type="checkbox"
          defaultChecked={selected}
          onChange={handleLabelCheck}
        />
      )}
      {name}
    </label>
  );
};
