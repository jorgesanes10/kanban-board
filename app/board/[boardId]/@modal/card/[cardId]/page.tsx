import db from '@/lib/db';
import { ICard, ILabel } from '../../../page';
import { CardModal } from '@/components/Card/CardModal';
import { getLabels } from '@/app/actions/getLabels';

export default async function CardDetail({
  params,
}: {
  params: { cardId: string };
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

  const selectedLabels =
    card.labels?.split(',').map((labelId) => {
      const label = labels.find((l) => l.id === labelId)!;

      return { id: label?.id, name: label?.name, color: label?.color };
    }) || ([] as ILabel[]);

  return (
    <CardModal card={card} labels={labels} selectedLabels={selectedLabels} />
  );
}
