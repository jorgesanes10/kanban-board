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
import { useEffect, useState } from 'react';
import { CardWidget } from '../Card/CardWidget';
import Link from 'next/link';
import Image from 'next/image';
import backIcon from './back-icon.svg';

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
  const [boardColumns, setBoardColumns] = useState(
    columns.map((col) => ({ id: col.id, name: col.name, cards: col.cards })),
  );

  useEffect(() => {
    setBoardColumns(
      columns.map((col) => ({ id: col.id, name: col.name, cards: col.cards })),
    );
  }, [columns]);

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
    const newColumnId = over.id as string;
    let activeCard = null;

    const newBoardColumns = [...boardColumns];

    for (const column of newBoardColumns) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        activeCard = column.cards.splice(cardIndex, 1)[0];
        break;
      }
    }

    if (activeCard) {
      const targetColumn = newBoardColumns.find(
        (col) => col.id === newColumnId,
      );

      if (targetColumn) {
        targetColumn.cards.push(activeCard);

        setBoardColumns(newBoardColumns);
        updateCard({ id: cardId, field: 'column_id', value: newColumnId });
      } else {
        console.warn('Target column not found for id:', newColumnId);
      }
    } else {
      console.warn('Card not found for id:', cardId);
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const selectedCard = allBoardCards?.find(
    ({ id: cardId }) => cardId === activeId,
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="p-6 h-full">
        <div className="flex items-center mb-5">
          <Link href="/">
            <Image
              src={backIcon}
              alt="Back to main page"
              height={24}
              width={24}
            />
          </Link>
          <h1 className="ml-2 text-2xl font-bold">{board.name}</h1>
        </div>
        <div
          className="flex gap-10 overflow-auto p-2"
          style={{ height: 'calc(100% - 45px)' }}
        >
          {boardColumns.map(({ name, id, cards }) => {
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
