import { useRef, useState } from 'react';
import { featuredDishes } from '../data/homeData';
import { formatINR } from '../utils/currency';

const trending = featuredDishes.slice(0, 6);

function TrendingCard({ dish }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group w-[280px] shrink-0 snap-start sm:w-[300px]">
      <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        <div className="relative h-44 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
            {dish.tag}
          </span>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">{dish.restaurant}</p>
            <h3 className="mt-0.5 font-display text-base font-semibold text-white">{dish.name}</h3>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-semibold text-ink">{formatINR(dish.price)}</span>
              <span className="rounded-md bg-brand/10 px-1.5 py-0.5 font-mono text-[10px] text-brand">
                ★ {dish.rating}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-muted">{dish.reviews} reviews</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className={`rounded-xl px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-95 ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-void text-white hover:bg-brand'
            }`}
          >
            {added ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function TrendingCarousel() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-50" />
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-brand/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Live Feed</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trending Today
            </h2>
            <p className="mt-2 max-w-md text-[15px] text-white/40">
              Real-time picks from our intelligence engine — updated every hour.
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-brand/30 hover:text-white"
              aria-label="Scroll left"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-brand/30 hover:text-white"
              aria-label="Scroll right"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
        >
          {trending.map((dish) => (
            <TrendingCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
}
