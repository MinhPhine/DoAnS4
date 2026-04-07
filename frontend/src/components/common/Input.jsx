export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-1 px-1">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-input-field rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1 px-1">{error}</p>}
    </div>
  );
}
