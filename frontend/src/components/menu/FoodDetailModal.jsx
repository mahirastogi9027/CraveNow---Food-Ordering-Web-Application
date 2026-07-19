import { useState } from 'react';
import VegBadge from './VegBadge';
import useAddToCart from '../../hooks/useAddToCart';
import ImageWithFallback from '../common/ImageWithFallback';
import { formatINR } from '../../utils/currency';

export default function FoodDetailModal({ item, onClose }) {
  const { handleAddToCart, isAdded } = useAddToCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const added = isAdded(item.id) || justAdded;

  const onAddToCart = () => {
    handleAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-void/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close details"
      />
      <div className="animate-scale-in relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-black/[0.06] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fallbackType="food"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
            aria-label="Close"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4">
            <VegBadge isVeg={item.isVeg} />
          </div>
        </div>

        <div className="p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{item.restaurant}</p>
          <h2 id="food-detail-title" className="mt-1 font-display text-2xl font-bold text-ink">
            {item.name}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-brand">★ {item.rating}</span>
            <span className="text-sm text-muted">{item.reviews} reviews</span>
            <span className="text-sm text-muted">· {item.deliveryTime}</span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.description}</p>

          <div className="mt-6 flex items-center justify-between border-t border-black/[0.06] pt-5">
            <span className="font-display text-2xl font-semibold text-ink">{formatINR(item.price)}</span>
            <button
              type="button"
              onClick={onAddToCart}
              className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-brand text-white hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)]'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
