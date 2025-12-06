import { DynamicIcon, IconName } from "lucide-react/dynamic";

type TInputProps = {
  placeholder: string;
  value: string;
  iconName?: IconName;
  onChange: (e: any) => void;
  className?: string;
};

const Input: React.FC<TInputProps> = ({
  placeholder,
  iconName,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="relative">
      {iconName && (
        <DynamicIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
          name={iconName}
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          iconName ? "pl-10" : ""
        } ${className}`}
      />
    </div>
  );
};

export default Input;
