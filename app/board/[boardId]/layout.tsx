// app/board/[boardId]/layout.tsx
export default function BoardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-[100vh]">
      {children}
      {modal}
    </div>
  );
}
