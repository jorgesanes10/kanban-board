import db from '@/lib/db';
import { ILabel } from '../board/[boardId]/page';

export async function getLabels() {
  const labelsRaw = (
    await db.execute({
      sql: 'SELECT * FROM labels',
    })
  ).rows;

  const labels = JSON.parse(JSON.stringify(labelsRaw));

  return labels as unknown as ILabel[];
}
