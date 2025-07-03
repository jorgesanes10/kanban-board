import React from 'react';
import Link from 'next/link';
import { createCard } from '@/app/actions/createCard';
import { Card } from '@/app/board/[boardId]/page';

interface ColumnProps {
  id: string;
  name: string;
  boardId: string;
  cards: Card[];
}

export const Column = ({ id, name, boardId, cards }: ColumnProps) => {
  return (
    <div key={id} className="border rounded px-4 py-1 w-60 flex flex-col">
      <h2 className="font-bold mb-2">{name}</h2>
      {cards.map(({ name, id: cardId }) => (
        <Link
          href={`/board/${boardId}/card/${cardId}`}
          key={cardId}
          className="border rounded p-2 mb-2"
        >
          {name}
        </Link>
      ))}
      <form action={createCard}>
        <input type="text" name="name" required placeholder="Create a task" />
        <input
          type="text"
          name="columnId"
          value={id}
          readOnly
          className="absolute hidden"
        />
        <input
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
