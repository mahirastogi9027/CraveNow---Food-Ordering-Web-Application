export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center rounded-xl border border-black/[0.08] bg-canvas">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-9 w-9 items-center justify-center text-muted transition hover:text-brand active:scale-95"
        aria-label="Decrease quantity"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>
      <span className="min-w-[2rem] text-center font-mono text-sm font-medium text-ink">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center text-muted transition hover:text-brand active:scale-95"
        aria-label="Increase quantity"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
