// app/actions/updateCard.ts
'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface UpdateCardInput {
  id: string;
  field: string;
  value: string | number | string[];
}

export async function updateCard({ id, field, value }: UpdateCardInput) {
  if (!id || !field) {
    throw new Error('Card id and field are required');
  }

  // Prepare dynamic SQL for updating a single field
  const validFields = ['name', 'description', 'points', 'labels', 'columnId'];
  if (!validFields.includes(field)) {
    throw new Error(`Invalid field: ${field}`);
  }

  let formattedValue = value;
  if (field === 'labels' && Array.isArray(value)) {
    formattedValue = JSON.stringify(value);
  }

  const stmt = db.prepare(`UPDATE cards SET ${field} = ? WHERE id = ?`);
  stmt.run(formattedValue, id);

  // Revalidate all boards containing this card
  revalidatePath('/board');
}
