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
  const boardRaw = (
    await db.execute({
      sql: 'SELECT * FROM boards WHERE id = ?',
      args: [boardId as string],
    })
  ).rows[0] as unknown as IBoard;

  const board = JSON.parse(JSON.stringify(boardRaw));

  if (!board) {
    // You can throw to trigger the 404 page
    throw new Error('Board not found');
  }

  const columnsRaw = (
    await db.execute({
      sql: 'SELECT * FROM columns WHERE board_id = ?',
      args: [boardId as string],
    })
  ).rows as unknown as IColumn[];

  const columns = JSON.parse(JSON.stringify(columnsRaw));

  for (const column of columns) {
    const cardsRaw = (
      await db.execute({
        sql: 'SELECT * FROM cards WHERE column_id = ?',
        args: [column.id],
      })
    ).rows as unknown as ICard[];

    const cards = JSON.parse(JSON.stringify(cardsRaw));

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
