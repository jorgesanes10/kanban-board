import { createLabel } from '@/app/actions/createLabel';
import { TextField } from '../Forms/TextField';
import { ILabel } from '@/app/board/[boardId]/page';
import { MouseEvent, useState } from 'react';
import { Label } from './Label';
import { Button } from '../Forms/Button';
import { Panel } from '../Containers/Panel';

interface LabelSelectorProps {
  labels: ILabel[];
  onLabelSelect: (labels: string | null) => void;
  selectedLabels: ILabel[];
}

export const LabelSelector = ({
  labels,
  onLabelSelect,
  selectedLabels,
}: LabelSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
    isToggledOn: boolean,
  ) => {
    const currentId = (event.target as HTMLButtonElement).id;

    const currentSelectedLabels = [...selectedLabels];

    if (isToggledOn) {
      const newLabel = labels.find((label) => label.id === currentId);
      currentSelectedLabels.push(newLabel!);
    } else {
      const index = currentSelectedLabels.findIndex((l) => l.id === currentId);

      if (index !== -1) {
        currentSelectedLabels.splice(index, 1);
      }
    }

    onLabelSelect(
      currentSelectedLabels.length === 0
        ? null
        : currentSelectedLabels.map((l) => l.id).join(','),
    );
  };

  const handleToggleViewClick = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <h3>Labels</h3>
      <div className="flex gap-2 py-4">
        {selectedLabels.map(({ id, name, color }) => (
          <Label key={id} name={name} color={color} />
        ))}
      </div>
      <Button onClick={handleToggleViewClick}>
        View {isExpanded ? 'less' : 'more'}
      </Button>
      {isExpanded && (
        <div className="mt-4 flex gap-4 items-start">
          <Panel className="flex gap-2 grow-1">
            {labels.map(({ id, name, color }) => {
              const isSelected =
                selectedLabels && !!selectedLabels.find((l) => l.id === id);

              return (
                <Button
                  key={id}
                  id={id}
                  customOnClick={handleButtonClick}
                  toggleable
                  isToggledOn={isSelected}
                >
                  <Label name={name} color={color} />
                </Button>
              );
            })}
          </Panel>
          <Panel className="w-65">
            <form action={createLabel} className="flex flex-col items-start">
              <label htmlFor="name">Name:</label>
              <TextField type="text" id="name" name="name" required />
              <label htmlFor="color">Color:</label>
              <TextField type="text" id="color" name="color" required />
              <Button className="mt-3">Create label</Button>
            </form>
          </Panel>
        </div>
      )}
    </div>
  );
};
