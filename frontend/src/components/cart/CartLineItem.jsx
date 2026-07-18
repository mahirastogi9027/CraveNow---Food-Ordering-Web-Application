import { useCart } from '../../context/CartContext';
import QuantitySelector from './QuantitySelector';
import { formatINR } from '../../utils/currency';

export default function CartLineItem({ item, index }) {
  const { updateQuantity, removeItem } = useCart();
  const subtotal = item.price * item.quantity;

  return (
    <article
      className="animate-scale-in group flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:gap-5 sm:p-5"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{item.restaurant}</p>
            <h3 className="mt-0.5 truncate font-display text-[15px] font-semibold text-ink">{item.name}</h3>
            <p className="mt-1 font-mono text-sm text-brand">{formatINR(item.price)} each</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-500 active:scale-95"
            aria-label={`Remove ${item.name}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantitySelector
            quantity={item.quantity}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Subtotal</span>
          <span className="font-display text-lg font-semibold text-ink">{formatINR(subtotal)}</span>
        </div>
      </div>
    </article>
  );
}
