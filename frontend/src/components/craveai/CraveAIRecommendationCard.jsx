import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';

export default function CraveAIRecommendationCard({ recommendation, onAddToCart }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: recommendation.id || Date.now(),
      name: recommendation.name,
      restaurant: recommendation.restaurant || 'Crave Now Kitchen',
      price: recommendation.price,
      image: recommendation.image,
      quantity: 1,
    });
    onAddToCart?.(recommendation.name);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:border-brand/30">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recommendation.image}
          alt={recommendation.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex items-center rounded-full bg-brand/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {recommendation.matchReason?.substring(0, 30)}...
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-display text-lg font-semibold text-ink line-clamp-1">{recommendation.name}</h3>
          <p className="text-sm text-muted">{recommendation.restaurant || 'Crave Now Kitchen'}</p>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{recommendation.prepTime || '20-25 min'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{recommendation.ingredients?.slice(0, 3).join(', ') || 'Fresh ingredients'}</span>
          </div>
          {recommendation.calories && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{recommendation.calories} cal</span>
            </div>
          )}
        </div>

        <div className="mb-4 rounded-xl bg-black/[0.02] p-3">
          <p className="text-xs text-muted mb-1">Why this matches your craving:</p>
          <p className="text-sm text-ink">{recommendation.matchReason}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-brand">{formatINR(recommendation.price)}</p>
            {recommendation.originalPrice && (
              <p className="text-xs text-muted line-through">{formatINR(recommendation.originalPrice)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(255,92,0,0.35)] active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
