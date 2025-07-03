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
      <input
        name="name"
        type="text"
        placeholder="Column name"
        className="border p-2 w-full rounded"
        required
      />
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
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create column
      </button>
    </form>
  );
};
