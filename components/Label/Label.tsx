import { getContrastTextColor } from '@/utils';

interface LabelProps {
  color: string;
  name: string;
}

export const Label = ({ color, name }: LabelProps) => {
  return (
    <label
      style={{ backgroundColor: color, color: getContrastTextColor(color) }}
      className="px-2 py-1 rounded text-gray-800 text-sm pointer-events-none"
    >
      {name}
    </label>
  );
};
