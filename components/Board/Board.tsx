'use client';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { IBoard, ICard, IColumn, ILabel } from '@/app/board/[boardId]/page';
import { Column } from '../Column/Column';
import { CreateColumnForm } from '../Forms/CreateColumnForm';
import { updateCard } from '@/app/actions/updateCard';
import { useState } from 'react';
import { CardWidget } from '../Card/CardWidget';

interface BoardProps {
  board: IBoard;
  columns: IColumn[];
  allLabels: ILabel[];
  allBoardCards: ICard[];
  createColumnAction: (formData: FormData) => Promise<void>;
}

export default function Board({
  board,
  columns,
  createColumnAction,
  allLabels,
  allBoardCards,
}: BoardProps) {
  const [activeId, setActiveId] = useState('null');

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId('');

    if (!over) return;

    const cardId = active.id as string;
    const newColumnId = over.id; // if over columns, or get parent column id from your structure

    // Update your local state for immediate UI feedback
    updateCard({ id: cardId, field: 'column_id', value: newColumnId });
    // Call updateCard({ id: cardId, field: 'columnId', value: newColumnId }) to persist
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const selectedCard = allBoardCards?.find(
    ({ id: cardId }) => cardId === activeId,
  );

  console.log('selectedCard', selectedCard);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="p-6 h-full">
        <h1 className="text-2xl font-bold mb-5">{board.name}</h1>
        <div
          className="flex gap-10 overflow-auto p-2"
          style={{ height: 'calc(100% - 45px)' }}
        >
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
          <DragOverlay dropAnimation={null}>
            {activeId && selectedCard ? (
              <CardWidget
                name={selectedCard.name}
                id={activeId}
                points={selectedCard.points}
                boardId={board.id}
                selectedLabels={selectedCard.labels}
                allLabels={allLabels}
                style={{
                  transform: 'rotate(-3deg)',
                  marginTop: '6px',
                  paddingTop: '12px',
                  zIndex: 1000,
                }}
              />
            ) : null}
          </DragOverlay>
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
