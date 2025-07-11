'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';

export async function createCard(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const points = formData.get('points') as unknown as number;
  const labels = formData.get('labels') as string;
  const columnId = formData.get('columnId') as string;

  const boardId = formData.get('boardId') as string;

  if (!name || name.trim() === '') {
    throw new Error('Card name is required');
  }

  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO cards (id, name, description, points, labels, column_id) VALUES (?, ?, ?, ?, ?, ?)',
    args: [id, name, description, points, labels, columnId],
  });

  revalidatePath(`/board/${boardId}`);
}
