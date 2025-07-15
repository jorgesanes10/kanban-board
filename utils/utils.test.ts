import { ILabel } from '@/app/board/[boardId]/page';
import { getSelectedLabels, getContrastTextColor } from './';

const allLabels: ILabel[] = [
  {
    id: 'label1',
    name: 'Label 1',
    color: 'yellow',
  },
  {
    id: 'label2',
    name: 'Label 2',
    color: 'blue',
  },
  {
    id: 'label3',
    name: 'Label 3',
    color: 'red',
  },
];

describe('utils', () => {
  it('returns the correct selected labels', () => {
    const labels = getSelectedLabels('label1,label2', allLabels);

    expect(labels).toEqual([
      { color: 'yellow', id: 'label1', name: 'Label 1' },
      { color: 'blue', id: 'label2', name: 'Label 2' },
    ]);
  });

  it('gets the correct text color for accessible contrast', () => {
    const textColor1 = getContrastTextColor('#ccc');
    expect(textColor1).toBe('#000000');

    const textColor2 = getContrastTextColor('#111');
    expect(textColor2).toBe('#FFFFFF');

    const textColor3 = getContrastTextColor('#EFC4A5');
    expect(textColor3).toBe('#000000');
  });
});
