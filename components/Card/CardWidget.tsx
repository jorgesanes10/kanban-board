'use client';

// import { useDraggable } from '@dnd-kit/core';
import { ILabel } from '@/app/board/[boardId]/page';
import { useRouter } from 'next/navigation';
import { getSelectedLabels } from '@/utils';
import { Label } from '../Label/Label';

interface CardWidgetProps {
  boardId: string;
  id: string;
  name: string;
  points?: number;
  selectedLabels?: string;
  allLabels?: ILabel[];
  getSelectedDraggingId?: (id: string) => void;
  style?: object;
}

export const CardWidget = ({
  boardId,
  id,
  name,
  points,
  selectedLabels,
  allLabels,
  style,
}: CardWidgetProps) => {
  const router = useRouter();

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id,
  // });

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(-3deg)`,
  //       zIndex: 10,
  //     }
  //   : undefined;

  const handleClick = () => {
    router.push(`/board/${boardId}/card/${id}`);
  };

  const formattedLabels = getSelectedLabels(selectedLabels!, allLabels!);

  return (
    <div
      onClick={handleClick}
      key={id}
      className="border border-white rounded px-4 py-2 mb-2 shadow-md flex flex-col justify-between backdrop-blur-md bg-[#f1f6fa] cursor-pointer"
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      style={style}
    >
      <div className="flex justify-between">
        <span>{name}</span>
        {points && (
          <span className="bg-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-sm text-white font-bold">
            {points}
          </span>
        )}
      </div>
      {formattedLabels.length > 0 && (
        <div className="mt-3 mb-2 flex gap-2 flex-wrap">
          {formattedLabels.map(({ id, name, color }) => (
            <Label key={id} name={name} color={color} />
          ))}
        </div>
      )}
    </div>
  );
};
