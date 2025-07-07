import { ButtonHTMLAttributes } from 'react';

export const Button = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  // cursor: pointer;
  // padding: 12px 20px;
  // -webkit-appearance: none;
  // font: Sans-Serif;
  // color: #7093B9;
  // font-size: 14px;
  // font-weight: 600;
  // border-radius: 22px;
  // border: none;
  return (
    <button
      {...props}
      className={`cursor-pointer py-3 px-5 border-none color-[#7093B9] text-sm rounded-3xl font-semibold ${className}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(238,245,251,1) 0%, rgba(228,241,254,1) 100%)',
      }}
    >
      {children}
    </button>
  );
};
