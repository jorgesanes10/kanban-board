'use client';

import { useDraggable } from '@dnd-kit/core';
import { ICard } from '@/app/board/[boardId]/page';
import { useRouter } from 'next/navigation';

export const CardWidget = ({
  boardId,
  id,
  name,
  points,
}: Omit<ICard, 'columnId'> & { boardId: string }) => {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(-3deg)`,
        zIndex: 10,
      }
    : undefined;

  const handleClick = () => {
    router.push(`/board/${boardId}/card/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={id}
      className="border border-gray-300 rounded p-2 mb-2 shadow-md flex justify-between backdrop-blur-md bg-white/50 cursor-pointer"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span>{name}</span>
      {points && (
        <span className="bg-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-sm text-white font-bold">
          {points}
        </span>
      )}
    </div>
  );
};
