import db from '@/lib/db';
import { ILabel } from '../board/[boardId]/page';

export async function getLabels() {
  const LabelsStmt = db.prepare('SELECT * FROM labels');
  const labels = LabelsStmt.all() as ILabel[];

  return labels;
}
