export default function VegBadge({ isVeg }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
        isVeg
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-red-500'}`}
        aria-hidden="true"
      />
      {isVeg ? 'Veg' : 'Non-Veg'}
    </span>
  );
}
