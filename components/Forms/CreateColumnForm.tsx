import { TextField } from './TextField';
import { Button } from './Button';

interface CreateColumnFormProps {
  action: (formData: FormData) => Promise<void>;
  boardId: string;
  columnsLength: number;
}

export const CreateColumnForm = ({
  action,
  boardId,
  columnsLength,
}: CreateColumnFormProps) => {
  return (
    <form action={action} className="space-y-4 flex-none w-60">
      <TextField name="name" type="text" placeholder="Column name" required />
      <input
        name="boardId"
        value={boardId}
        readOnly
        className="absolute hidden"
      />
      <input
        name="position"
        value={columnsLength + 1}
        readOnly
        className="absolute hidden"
      />
      <Button type="submit">Create column</Button>
    </form>
  );
};
