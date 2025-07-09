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

export function getContrastTextColor(backgroundColor: string) {
  // Remove # if present
  if (backgroundColor.startsWith('#')) {
    backgroundColor = backgroundColor.slice(1);
  }

  // Expand shorthand hex (e.g., "fff") to full form ("ffffff")
  if (backgroundColor.length === 3) {
    backgroundColor = backgroundColor
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(backgroundColor.slice(0, 2), 16) / 255;
  const g = parseInt(backgroundColor.slice(2, 4), 16) / 255;
  const b = parseInt(backgroundColor.slice(4, 6), 16) / 255;

  // Convert to luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is low, use white text; if high, use black text
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
