import { useState } from 'react';
import { featuredDishes } from '../data/homeData';
import { formatINR } from '../utils/currency';

function DishCard({ dish, index }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      className="group animate-scale-in"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-lg border border-black/[0.06] bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-brand backdrop-blur-sm">
            {dish.tag}
          </span>
          <button
            type="button"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.06] bg-white/90 text-muted opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-brand"
            aria-label="Save"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{dish.restaurant}</p>
          <h3 className="mt-1 font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-brand">
            {dish.name}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[11px] text-brand">★ {dish.rating}</span>
            <span className="text-[11px] text-muted">· {dish.reviews} reviews</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-ink">{formatINR(dish.price)}</span>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-95 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'border border-black/[0.08] bg-canvas text-ink hover:border-brand hover:bg-brand hover:text-white'
              }`}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedDishes() {
  return (
    <section id="restaurants" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Collection</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Featured Dishes
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              Hand-selected by our curation engine — each dish scored on taste, quality, and experience.
            </p>
          </div>
          <button
            type="button"
            className="self-start rounded-xl border border-black/[0.08] px-5 py-2.5 text-[13px] font-medium text-ink transition hover:border-brand hover:text-brand"
          >
            View all →
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
