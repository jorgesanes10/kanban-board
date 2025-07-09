import db from '@/lib/db';
import { ICard } from '../../../page';
import { CardModal } from '@/components/Card/CardModal';
import { getLabels } from '@/app/actions/getLabels';
import { getSelectedLabels } from '@/utils';

export default async function CardDetail({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { cardId } = await params;

  // Direct SQLite query inside the Server Component
  const cardStmt = db.prepare('SELECT * FROM cards WHERE id = ?');
  const card = cardStmt.get(cardId) as ICard;

  const labels = await getLabels();

  if (!card) {
    // You can throw to trigger the 404 page
    throw new Error('Card not found');
  }

  const selectedLabels = getSelectedLabels(card.labels!, labels);

  return (
    <CardModal card={card} labels={labels} selectedLabels={selectedLabels} />
  );
}
