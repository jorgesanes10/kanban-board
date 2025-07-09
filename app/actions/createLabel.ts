'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createLabel(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  if (!name || name.trim() === '' || !color || color.trim() === '') {
    throw new Error('Label name and Color are required');
  }

  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO labels (id, name, color) VALUES (?, ?, ?)',
    args: [id, name, color],
  });

  // Optionally redirect to the new board page after creation
  revalidatePath('/board');
}
