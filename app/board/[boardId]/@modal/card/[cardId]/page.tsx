import db from '@/lib/db';
import { ICard } from '../../../page';
import { CardModal } from '@/components/Card/CardModal';

export default async function CardDetail({
  params,
}: {
  params: { cardId: string };
}) {
  const { cardId } = await params;

  // Direct SQLite query inside the Server Component
  const cardStmt = db.prepare('SELECT * FROM cards WHERE id = ?');
  const card = cardStmt.get(cardId) as ICard;

  if (!card) {
    // You can throw to trigger the 404 page
    throw new Error('Card not found');
  }

  return <CardModal card={card} />;
}
