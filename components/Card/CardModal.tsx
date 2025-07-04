'use client';

import { ChangeEvent } from 'react';
import { updateCard } from '@/app/actions/updateCard';
import { ICard, ILabel } from '@/app/board/[boardId]/page';
import { useRouter } from 'next/navigation';
import { TextField } from '../Forms/TextField';
import { LabelSelector } from '../Label/LabelSelector';

interface CardModalProps {
  card: ICard;
  labels: ILabel[];
  selectedLabels?: ILabel[];
}

export const CardModal = ({ card, labels, selectedLabels }: CardModalProps) => {
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

  const handleLabelSelect = (newLabels: string) => {
    updateCard({ id: card.id, field: 'labels', value: newLabels });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-900/70 flex justify-center items-center cursor-pointer"
      onClick={handleClose}
    >
      <div
        className="border rounded p-10 bg-white/90 backdrop-blur-xs cursor-default"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl">{card.name}</h1>
          <button className="cursor-pointer" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="rounded-3xl border border-gray-400 px-3 py-2 inset-shadow-md w-200 h-50"
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
            <TextField
              type="number"
              id="points"
              name="points"
              defaultValue={card.points || 0}
              onBlur={handleFieldChange}
              className="w-20"
            />
          </div>
          <LabelSelector
            labels={labels}
            onLabelSelect={handleLabelSelect}
            selectedLabels={selectedLabels!}
          />
        </div>
      </div>
    </div>
  );
};
