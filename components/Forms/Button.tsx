'use client';

import { ButtonHTMLAttributes, MouseEvent, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggleable?: boolean;
  isToggledOn?: boolean;
  customOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    isToggledOn: boolean,
  ) => void;
}

export const Button = ({
  children,
  className,
  toggleable,
  isToggledOn,
  customOnClick,
  onClick,
  ...props
}: ButtonProps) => {
  const [isToggledOnState, setIsToggledOne] = useState(isToggledOn);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (customOnClick) {
      customOnClick(event, !isToggledOn);
    }

    if (onClick) {
      onClick(event);
    }

    if (toggleable) {
      setIsToggledOne((prevToggledOn) => !prevToggledOn);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`cursor-pointer py-3 px-5 border-none color-[#7093B9] text-sm rounded-3xl font-semibold ${className} ${toggleable ? `toggleable ${isToggledOnState ? 'on' : ''}` : ''}`}
    >
      {children}
    </button>
  );
};
