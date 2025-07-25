import React, { useOptimistic, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { createCard } from '@/app/actions/createCard';
import { ICard, ILabel } from '@/app/board/[boardId]/page';
import { TextField } from '../Forms/TextField';
import { CardWidget } from '../Card/CardWidget';
import { Draggable } from '../Card/Draggable';
interface ColumnProps {
  id: string;
  name: string;
  boardId: string;
  cards: ICard[];
  allLabels: ILabel[];
}

export const Column = ({
  id,
  name,
  boardId,
  cards,
  allLabels,
}: ColumnProps) => {
  const [optimisticCards, addOptimisticCard] = useOptimistic(
    cards,
    (state, newCard: ICard) => [...state, newCard],
  );

  const nameRef = useRef<HTMLInputElement>(null);

  const formAction = (formData: FormData) => {
    nameRef.current!.value = '';
    createCard(formData);

    addOptimisticCard({
      name: formData.get('name') as string,
      columnId: formData.get('columnId') as string,
      id: '',
    });
  };

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  const totalColumnPoints = optimisticCards.reduce(
    (acc, { points }) => acc + (points || 0),
    0,
  );

  return (
    <div
      key={id}
      className="text-lg bg-[#EAF1F8] border border-white radius-lg rounded-3xl py-2.5 px-5"
      ref={setNodeRef}
      style={{
        ...style,
        boxShadow:
          '1px 1px 2px rgba(190, 190, 190, 0.5), inset -1px -1px 6px #fff, inset 1px 1px 6px rgba(0, 0, 0, 0.17)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">{name}</h2>
        {totalColumnPoints > 0 && (
          <span className="bg-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-sm text-white font-bold">
            {totalColumnPoints}
          </span>
        )}
      </div>
      <div className="overflow-auto" style={{ maxHeight: 'calc(100% - 96px)' }}>
        {optimisticCards.map(({ name, id: cardId, points, labels }) => (
          <Draggable key={cardId} id={cardId}>
            <CardWidget
              key={cardId}
              name={name}
              id={cardId}
              points={points}
              boardId={boardId}
              selectedLabels={labels}
              allLabels={allLabels}
            />
          </Draggable>
        ))}
      </div>
      <form action={formAction} className="mt-4">
        <TextField
          ref={nameRef}
          type="text"
          name="name"
          required
          placeholder="Create a task"
        />
        <TextField
          type="text"
          name="columnId"
          value={id}
          readOnly
          className="absolute hidden"
        />
        <TextField
          type="text"
          name="boardId"
          value={boardId}
          readOnly
          className="absolute hidden"
        />
        <button type="submit" className="hidden absolute">
          Submit
        </button>
      </form>
    </div>
  );
};
