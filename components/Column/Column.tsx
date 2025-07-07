import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { createCard } from '@/app/actions/createCard';
import { ICard, ILabel } from '@/app/board/[boardId]/page';
import { TextField } from '../Forms/TextField';
import { CardWidget } from '../Card/CardWidget';

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
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  // font-size: 16px;
  // color: #77808E;
  // margin-right: 40px;
  // background-color: #EAF1F8;
  // border: 1px solid #fff;
  // border-radius: 28px;
  // padding: 10px 20px;
  // box-shadow: 1px 1px 2px rgba(190, 190, 190, 0.5), inset -1px -1px 6px #fff, inset 1px 1px 6px rgba(0, 0, 0, 0.17);

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
      <h2 className="font-bold mb-4 text-xl">{name}</h2>
      {cards.map(({ name, id: cardId, points, labels }) => (
        <CardWidget
          key={cardId}
          name={name}
          id={cardId}
          points={points}
          boardId={boardId}
          selectedLabels={labels}
          allLabels={allLabels}
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
