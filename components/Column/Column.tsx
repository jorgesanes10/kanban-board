import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { createCard } from '@/app/actions/createCard';
import { ICard } from '@/app/board/[boardId]/page';
import { TextField } from '../Forms/TextField';
import { CardWidget } from '../Card/CardWidget';

interface ColumnProps {
  id: string;
  name: string;
  boardId: string;
  cards: ICard[];
}

export const Column = ({ id, name, boardId, cards }: ColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div
      key={id}
      className="border border-gray-300 rounded px-4 py-3 w-60 flex flex-col bg-white/20 backdrop-blur-xs shadow-md z-0"
      ref={setNodeRef}
      style={style}
    >
      <h2 className="font-bold mb-4 text-xl">{name}</h2>
      {cards.map(({ name, id: cardId, points }) => (
        <CardWidget
          key={cardId}
          name={name}
          id={cardId}
          points={points}
          boardId={boardId}
        />
      ))}
      <form action={createCard} className="mt-4">
        <TextField
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
