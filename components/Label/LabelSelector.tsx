import { createLabel } from '@/app/actions/createLabel';
import { TextField } from '../Forms/TextField';
import { ILabel } from '@/app/board/[boardId]/page';
import { ChangeEvent } from 'react';
import { Label } from './Label';

interface LabelSelectorProps {
  labels: ILabel[];
  onLabelSelect: (labels: string) => void;
  selectedLabels: ILabel[];
}

export const LabelSelector = ({
  labels,
  onLabelSelect,
  selectedLabels,
}: LabelSelectorProps) => {
  const handleLabelCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const currentSelectedLabels = [...selectedLabels];

    if (checked) {
      const newLabel = labels.find((label) => label.id === value);
      currentSelectedLabels.push(newLabel!);
    } else {
      const index = currentSelectedLabels.findIndex((l) => l.id === value);

      if (index !== -1) {
        currentSelectedLabels.splice(index, 1);
      }
    }

    onLabelSelect(currentSelectedLabels.map((l) => l.id).join(','));
  };

  return (
    <div>
      <h3>Labels</h3>
      <div className="flex gap-2">
        {labels.map(({ id, name, color }) => {
          const isSelected =
            selectedLabels && !!selectedLabels.find((l) => l.id === id);

          return (
            <Label
              key={id}
              id={id}
              name={name}
              color={color}
              handleLabelCheck={handleLabelCheck}
              selectable
              selected={isSelected}
            />
          );
        })}
      </div>
      <form action={createLabel}>
        <label htmlFor="name">Name:</label>
        <TextField type="text" id="name" name="name" required />
        <label htmlFor="color">Color:</label>
        <TextField type="text" id="color" name="color" required />
        <button>Create label</button>
      </form>
    </div>
  );
};
