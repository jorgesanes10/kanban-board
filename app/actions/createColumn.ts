'use server';

import { redirect } from 'next/navigation';
import db from '@/lib/db';

export async function createColumn(formData: FormData) {
  const name = formData.get('name') as string;
  const boardId = formData.get('boardId') as string;
  const position = formData.get('position') as unknown as number;

  if (!name || name.trim() === '') {
    throw new Error('Column name is required');
  }

  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO columns (id, name, board_id, position) VALUES (?, ?, ?, ?)',
    args: [id, name, boardId, position],
  });

  redirect(`/board/${boardId}`);
}
