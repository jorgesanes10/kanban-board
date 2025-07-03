'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CardModal({
  params,
}: {
  params: { boardId: string; cardId: string };
}) {
  const router = useRouter();

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  // Fetch card data here if needed, e.g.:
  // const card = getCard(params.cardId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Card {params.cardId}</h2>
        {/* Card detail form here */}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
