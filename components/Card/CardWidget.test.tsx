import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { CardWidget } from './CardWidget';
import { ILabel } from '@/app/board/[boardId]/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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

describe('CardWidget', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders card name and points', () => {
    render(
      <CardWidget
        boardId="board-1"
        id="card-1"
        name="Test Card"
        points={5}
        selectedLabels="label1,label2"
        allLabels={allLabels}
      />,
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.getByText('Label 2')).toBeInTheDocument();
  });

  it('does not render points badge if no points provided', () => {
    render(
      <CardWidget
        boardId="board-1"
        id="card-1"
        name="Test Card"
        selectedLabels="label1"
        allLabels={allLabels}
      />,
    );

    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('navigates to card detail on click', () => {
    render(
      <CardWidget
        boardId="board-1"
        id="card-1"
        name="Test Card"
        selectedLabels="label2"
        allLabels={allLabels}
      />,
    );

    fireEvent.click(screen.getByText('Test Card'));

    expect(pushMock).toHaveBeenCalledWith('/board/board-1/card/card-1');
  });
});
