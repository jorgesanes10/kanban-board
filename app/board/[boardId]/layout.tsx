// app/board/[boardId]/layout.tsx
export default function BoardLayout({
  children,
  card,
}: {
  children: React.ReactNode;
  card: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full">
      {children}
      {card}
    </div>
  );
}
