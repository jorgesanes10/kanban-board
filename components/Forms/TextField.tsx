export const TextField = ({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`bg-[#C8D9E8] rounded-lg px-2 py-1 text-gray-800 ${className}`}
      style={{ boxShadow: 'inset 0 1px 3px #A5BFD9' }}
      {...rest}
    />
  );
};
