import { Icon } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

type TButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  iconName?: IconName;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<TButtonProps> = ({
  children,
  variant = "primary",
  iconName,
  onClick,
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {iconName && <DynamicIcon name={iconName} size={18} />}
      {children}
    </button>
  );
};

export default Button;
