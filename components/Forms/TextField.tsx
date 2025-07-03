export const TextField = ({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`rounded-3xl border border-gray-400 px-3 py-2 inset-shadow-md ${className}`}
      {...rest}
    />
  );
};
