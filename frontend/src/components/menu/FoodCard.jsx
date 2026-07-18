import VegBadge from './VegBadge';
import useAddToCart from '../../hooks/useAddToCart';
import { formatINR } from '../../utils/currency';

export default function FoodCard({ item, index, onViewDetails }) {
  const { handleAddToCart, isAdded } = useAddToCart();
  const added = isAdded(item.id);

  return (
    <article
      className="group animate-scale-in"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(0,0,0,0.1)] hover:border-brand/20">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 top-4">
            <VegBadge isVeg={item.isVeg} />
          </div>
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-lg border border-black/[0.06] bg-white/90 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur-sm">
            <svg className="h-3 w-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {item.deliveryTime}
          </span>
        </div>

        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{item.restaurant}</p>
          <h3 className="mt-1 font-display text-[15px] font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
            {item.name}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[11px] text-brand">★ {item.rating}</span>
            <span className="text-[11px] text-muted">· {item.reviews} reviews</span>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-display text-lg font-semibold text-ink">{formatINR(item.price)}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onViewDetails(item)}
                className="flex-1 rounded-xl border border-black/[0.08] px-3 py-2 text-xs font-medium text-muted transition-all duration-300 hover:border-brand hover:text-brand active:scale-95 sm:flex-none"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className={`flex-1 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 active:scale-95 sm:flex-none ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'border border-black/[0.08] bg-canvas text-ink hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_0_20px_rgba(255,92,0,0.25)]'
                }`}
              >
                {added ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
