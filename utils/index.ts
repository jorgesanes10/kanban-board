import { ILabel } from '@/app/board/[boardId]/page';

export const getSelectedLabels = (
  cardLabels: string | null,
  allLabels: ILabel[],
) => {
  return (
    cardLabels?.split(',').map((labelId) => {
      const label = allLabels.find((l) => l.id === labelId)!;

      return { id: label?.id, name: label?.name, color: label?.color };
    }) || ([] as ILabel[])
  );
};
