'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';

export async function createBoard(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name || name.trim() === '') {
    throw new Error('Board name is required');
  }

  const id = crypto.randomUUID();

  const stmt = db.prepare('INSERT INTO boards (id, name) VALUES (?, ?)');
  stmt.run(id, name);

  // Optionally redirect to the new board page after creation
  redirect(`/board/${id}`);
}
