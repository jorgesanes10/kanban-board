'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';

export async function createBoard(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name || name.trim() === '') {
    throw new Error('Board name is required');
  }

  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO boards (id, name) VALUES (?, ?)',
    args: [id, name],
  });

  // Optionally redirect to the new board page after creation
  redirect(`/board/${id}`);
}
