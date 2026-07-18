const floatingFoods = [
  { emoji: '🍣', label: 'Sushi', size: 'lg', delay: '0s', x: '8%', y: '18%' },
  { emoji: '🍕', label: 'Pizza', size: 'md', delay: '1s', x: '78%', y: '12%' },
  { emoji: '🥗', label: 'Bowls', size: 'sm', delay: '2s', x: '85%', y: '55%' },
  { emoji: '🍜', label: 'Ramen', size: 'md', delay: '0.5s', x: '5%', y: '62%' },
  { emoji: '🧁', label: 'Dessert', size: 'sm', delay: '1.5s', x: '72%', y: '72%' },
];

const sizeMap = {
  sm: 'h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl',
  md: 'h-16 w-16 text-2xl sm:h-20 sm:w-20 sm:text-3xl',
  lg: 'h-20 w-20 text-3xl sm:h-24 sm:w-24 sm:text-4xl',
};

function FloatingOrb({ food }) {
  return (
    <div
      className="absolute hidden animate-drift sm:block"
      style={{ left: food.x, top: food.y, animationDelay: food.delay }}
    >
      <div className={`group relative flex ${sizeMap[food.size]} cursor-default items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-brand/40 hover:bg-brand/10 hover:shadow-[0_0_32px_rgba(255,92,0,0.2)]`}>
        <span className="select-none">{food.emoji}</span>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          {food.label}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-void dot-grid">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand/[0.04] blur-[100px]" />
        <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[80px]" />
      </div>

      {floatingFoods.map((food) => (
        <FloatingOrb key={food.label} food={food} />
      ))}

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-32 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
            AI-Powered Culinary Platform
          </span>
        </div>

        <h1 className="animate-fade-up-d1 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
          Taste, reimagined
          <br />
          <span className="bg-gradient-to-r from-brand via-orange-400 to-brand bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
            by intelligence.
          </span>
        </h1>

        <p className="animate-fade-up-d2 mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/45 sm:text-base">
          Crave Now learns your palate, curates your world of flavor, and delivers
          with precision — a new standard in how you experience food.
        </p>

        <div className="animate-fade-up-d3 mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-xl transition-all focus-within:border-brand/30 focus-within:shadow-[0_0_32px_rgba(255,92,0,0.1)]">
            <svg className="h-4 w-4 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Ask anything — cuisines, moods, cravings..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
            />
          </div>
          <button
            type="button"
            className="group relative overflow-hidden rounded-2xl bg-brand px-7 py-3.5 text-sm font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(255,92,0,0.35)] active:scale-[0.97]"
          >
            <span className="relative z-10">Discover</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        <div className="animate-fade-up-d3 mt-16 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-white/[0.06] pt-10">
          {[
            { value: '2.4M+', label: 'Orders curated' },
            { value: '<28m', label: 'Avg. delivery' },
            { value: '99.2%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-3 sm:hidden">
          {['🍣', '🍕', '🥗', '🍜'].map((emoji) => (
            <span key={emoji} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl backdrop-blur-sm">
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
