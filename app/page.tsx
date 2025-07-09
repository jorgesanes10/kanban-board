import db from '@/lib/db';
import { createBoard } from '@/app/actions/createBoard';
import Link from 'next/link';
import { Button } from '@/components/Forms/Button';
import { TextField } from '@/components/Forms/TextField';

interface Board {
  id: string;
  name: string;
}

export default function Home() {
  // Direct SQLite query inside the Server Component
  const stmt = db.prepare('SELECT * FROM boards');
  const boards = stmt.all() as Board[];

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-semibold mb-2">Your boards</h1>
      <ul>
        {boards.map(({ name, id }) => (
          <li className="list-disc" key={id}>
            <Link className="hover:underline" href={`/board/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <h2 className="mt-2 mb-2 text-xl">
          {boards.length === 0 && 'You don&apos;t have boards created. '}Create
          a new board now
        </h2>
        <form
          action={createBoard}
          className="space-y-4 flex flex-col items-start"
        >
          <TextField
            name="name"
            type="text"
            placeholder="Board name"
            required
          />
          <Button type="submit">Create Board</Button>
        </form>
      </div>
    </div>
  );
}
