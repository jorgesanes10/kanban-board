import { createColumn } from '@/app/actions/createColumn';
import { getLabels } from '@/app/actions/getLabels';
import Board from '@/components/Board/Board';
import db from '@/lib/db';

export interface IBoard {
  id: string;
  name: string;
}

export interface IColumn {
  id: string;
  name: string;
  position: number;
  cards: ICard[];
}

export interface ICard {
  id: string;
  name: string;
  description?: string;
  points?: number;
  labels?: string;
  columnId: string;
}

export interface ILabel {
  id: string;
  name: string;
  color: string;
}

export default async function BoardPage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { boardId } = await params;

  // Direct SQLite query inside the Server Component
  const boardStmt = db.prepare('SELECT * FROM boards WHERE id = ?');
  const board = boardStmt.get(boardId) as IBoard;

  if (!board) {
    // You can throw to trigger the 404 page
    throw new Error('Board not found');
  }

  const columnsStmt = db.prepare('SELECT * FROM columns WHERE board_id = ?');
  const columns = columnsStmt.all(boardId) as IColumn[];

  for (const column of columns) {
    const cardsStmt = db.prepare('SELECT * FROM cards WHERE column_id = ?');
    const cards = cardsStmt.all(column.id) as ICard[];
    column.cards = cards; // attach cards to the column
  }

  const labels = await getLabels();

  return (
    <Board
      board={board}
      columns={columns}
      createColumnAction={createColumn}
      allLabels={labels}
    />
  );
}
