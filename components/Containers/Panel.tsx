import { HTMLAttributes } from 'react';

export const Panel = ({
  children,
  style,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`text-lg bg-[#EAF1F8] border border-white radius-lg rounded-3xl py-2.5 px-5 ${className}`}
      style={{
        ...style,
        boxShadow:
          '1px 1px 2px rgba(190, 190, 190, 0.5), inset -1px -1px 6px #fff, inset 1px 1px 6px rgba(0, 0, 0, 0.17)',
      }}
    >
      {children}
    </div>
  );
};
