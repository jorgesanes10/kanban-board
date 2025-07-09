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

  const cardRaw = (
    await db.execute({
      sql: 'SELECT * FROM cards WHERE id = ?',
      args: [cardId as string],
    })
  ).rows[0] as unknown as ICard;

  const card = JSON.parse(JSON.stringify(cardRaw));

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
