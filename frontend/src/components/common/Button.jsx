export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-input-field text-foreground hover:bg-gray-200",
    outline: "border border-border-custom text-foreground hover:bg-gray-50",
  };

  return (
    <button
      className={`w-full py-2.5 rounded-full font-bold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
