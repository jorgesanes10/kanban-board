// app/board/[boardId]/page.tsx
import { createColumn } from '@/app/actions/createColumn';
import { Column } from '@/components/Column/Column';
import { CreateColumnForm } from '@/components/Forms/CreateColumnForm';
import db from '@/lib/db';

interface Board {
  id: string;
  name: string;
}

interface Column {
  id: string;
  name: string;
  position: number;
}

export interface Card {
  id: string;
  name: string;
  description?: string;
  points?: number;
  labels?: string[];
  columnId: string;
}

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const { boardId } = await params;

  // Direct SQLite query inside the Server Component
  const boardStmt = db.prepare('SELECT * FROM boards WHERE id = ?');
  const board = boardStmt.get(boardId) as Board;

  if (!board) {
    // You can throw to trigger the 404 page
    throw new Error('Board not found');
  }

  const columnsStmt = db.prepare('SELECT * FROM columns WHERE board_id = ?');
  const columns = columnsStmt.all(boardId) as Column[];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">{board.name}</h1>
      <div className="h-[70vh] flex gap-10 overflow-auto">
        {columns.map(({ name, id }) => {
          const cardsStmt = db.prepare(
            'SELECT * FROM cards WHERE column_id = ?',
          );
          const cards = cardsStmt.all(id) as Card[];

          console.log('cards', cards);

          return (
            <Column
              key={id}
              id={id}
              name={name}
              boardId={boardId}
              cards={cards}
            />
          );
        })}
        <CreateColumnForm
          action={createColumn}
          boardId={boardId}
          columnsLength={columns.length}
        />
      </div>
    </div>
  );
}
