'use client';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { IBoard, IColumn, ILabel } from '@/app/board/[boardId]/page';
import { Column } from '../Column/Column';
import { CreateColumnForm } from '../Forms/CreateColumnForm';
import { updateCard } from '@/app/actions/updateCard';

interface BoardProps {
  board: IBoard;
  columns: IColumn[];
  allLabels: ILabel[];
  createColumnAction: (formData: FormData) => Promise<void>;
}

export default function Board({
  board,
  columns,
  createColumnAction,
  allLabels,
}: BoardProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const newColumnId = over.id; // if over columns, or get parent column id from your structure

    // Update your local state for immediate UI feedback
    updateCard({ id: cardId, field: 'column_id', value: newColumnId });
    // Call updateCard({ id: cardId, field: 'columnId', value: newColumnId }) to persist
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-5">{board.name}</h1>
        <div className="h-[70vh] flex gap-10 overflow-auto p-2">
          {columns.map(({ name, id, cards }) => {
            return (
              <Column
                key={id}
                id={id}
                name={name}
                boardId={board.id}
                cards={cards}
                allLabels={allLabels}
              />
            );
          })}
          <CreateColumnForm
            action={createColumnAction}
            boardId={board.id}
            columnsLength={columns.length}
          />
        </div>
      </div>
    </DndContext>
  );
}
