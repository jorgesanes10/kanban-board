// app/boards/[id]/page.tsx
import db from '@/lib/db';
import { createBoard } from '@/app/actions/createBoard';
import Link from 'next/link';

interface Board {
  id: string;
  name: string;
}

export default function Home() {
  // Direct SQLite query inside the Server Component
  const stmt = db.prepare('SELECT * FROM boards');
  const boards = stmt.all() as Board[];

  return (
    <div className="p-6">
      <ul>
        {boards.map(({ name, id }) => (
          <li key={id}>
            <Link href={`/board/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <h1>You don&apos;t have boards created. Create a new board now</h1>
        <form action={createBoard} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Board name"
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
}
