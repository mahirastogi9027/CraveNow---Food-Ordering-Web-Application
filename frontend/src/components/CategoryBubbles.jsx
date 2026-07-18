import { useState } from 'react';
import { categories } from '../data/homeData';

const bubbleLayout = [
  { scale: 1.15, delay: '0s' },
  { scale: 0.95, delay: '0.8s' },
  { scale: 1.05, delay: '1.6s' },
  { scale: 0.9, delay: '0.4s' },
  { scale: 1.1, delay: '1.2s' },
  { scale: 1, delay: '2s' },
];

export default function CategoryBubbles() {
  const [active, setActive] = useState(null);

  return (
    <section id="menu" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid-dark" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Explore</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What are you in the
            <br className="hidden sm:block" />
            {' '}mood for?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
            Tap a bubble to explore curated collections — no menus, just moments.
          </p>
        </div>

        <div className="relative mx-auto flex min-h-[320px] max-w-3xl flex-wrap items-center justify-center gap-4 sm:min-h-[380px] sm:gap-6">
          {categories.map((cat, i) => {
            const layout = bubbleLayout[i % bubbleLayout.length];
            const isActive = active === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(isActive ? null : cat.id)}
                className="group relative animate-drift focus:outline-none"
                style={{
                  animationDelay: layout.delay,
                  transform: `scale(${layout.scale})`,
                }}
              >
                <div
                  className={`relative flex h-24 w-24 flex-col items-center justify-center rounded-full border transition-all duration-500 sm:h-28 sm:w-28 ${
                    isActive
                      ? 'border-brand bg-brand/10 shadow-[0_0_48px_rgba(255,92,0,0.25)] scale-110'
                      : 'border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-brand/30 hover:shadow-[0_8px_32px_rgba(255,92,0,0.12)] hover:scale-105'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-brand/5 animate-pulse-glow" />
                  )}
                  <span className="relative text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                    {cat.emoji}
                  </span>
                </div>

                <span
                  className={`mt-3 block text-center font-display text-sm font-medium transition-colors ${
                    isActive ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {cat.name}
                </span>
                <span className="block text-center font-mono text-[10px] text-muted">
                  {cat.count} spots
                </span>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="animate-scale-in mx-auto mt-8 max-w-md rounded-2xl border border-black/[0.06] bg-white p-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-brand">Selected</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {categories.find((c) => c.id === active)?.name}
            </p>
            <p className="mt-1 text-sm text-muted">Curating your personalized picks...</p>
          </div>
        )}
      </div>
    </section>
  );
}
