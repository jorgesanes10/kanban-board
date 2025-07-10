import db from '@/lib/db';
import { createBoard } from '@/app/actions/createBoard';
import Link from 'next/link';
import { Button } from '@/components/Forms/Button';
import { TextField } from '@/components/Forms/TextField';
import { Panel } from '@/components/Containers/Panel';

interface Board {
  id: string;
  name: string;
}

export default async function Home() {
  const boardsRaw = (
    await db.execute({
      sql: 'SELECT * FROM boards',
    })
  ).rows;

  const boards = JSON.parse(JSON.stringify(boardsRaw)) as unknown as Board[];

  return (
    <div className="p-6 h-full flex gap-5">
      <Panel className="basis-[50%]">
        <h1 className="text-2xl font-semibold mb-2">Your boards</h1>
        <ul>
          {boards.map(({ name, id }) => (
            <li key={id}>
              <Link className="hover:underline" href={`/board/${id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel className="basis-[50%]">
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
      </Panel>
    </div>
  );
}
