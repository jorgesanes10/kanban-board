'use client';

import { ChangeEvent } from 'react';
import { updateCard } from '@/app/actions/updateCard';
import { Card } from '@/app/board/[boardId]/page';
import { useRouter } from 'next/navigation';

interface CardModalProps {
  card: Card;
}

export const CardModal = ({ card }: CardModalProps) => {
  const router = useRouter();

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const id = card.id;
    const field = event.target.name;
    const value = event.target.value;

    console.log({ id, field, value });

    updateCard({ id, field, value });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background/70 flex justify-center items-center cursor-pointer"
      onClick={handleClose}
    >
      <div
        className="border rounded p-10 bg-background cursor-default"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl">{card.name}</h1>
          <button className="cursor-pointer" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="border p-2"
            id="description"
            name="description"
            defaultValue={card.description || ''}
            placeholder="Description..."
            onBlur={handleFieldChange}
          />
          <div>
            <label htmlFor="points" className="mr-2">
              Points
            </label>
            <input
              type="number"
              id="points"
              name="points"
              defaultValue={card.points || 0}
              onBlur={handleFieldChange}
              className="border p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
