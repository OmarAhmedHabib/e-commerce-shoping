type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'ghost' | 'default';
  onClick?: () => void;
};

export default function Button({ children, className, variant = 'default', ...props }: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyle =
    variant === 'ghost'
      ? 'bg-transparent text-gray-700 hover:bg-gray-100'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button className={`${baseStyle} ${variantStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}
