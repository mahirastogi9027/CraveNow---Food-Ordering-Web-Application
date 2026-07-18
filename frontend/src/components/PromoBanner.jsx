export default function PromoBanner() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-black/[0.06] bg-void">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-[80px]" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-orange-500/10 blur-[60px]" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.02]" />
          <svg className="absolute right-8 top-8 h-32 w-32 text-white/[0.03]" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,5 95,35 80,90 20,90 5,35" />
          </svg>
          <svg className="absolute bottom-12 left-12 h-20 w-20 text-brand/[0.08]" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" />
          </svg>
        </div>

        <div className="relative grid items-center gap-10 px-8 py-16 sm:px-12 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Limited Offer</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Your first order,
              <br />
              <span className="text-brand">on us.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/40">
              Join Crave Now and unlock complimentary delivery on your first three orders.
              Intelligence meets indulgence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_0_32px_rgba(255,92,0,0.35)] active:scale-[0.97]"
              >
                Claim Offer
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-brand/20 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Promo Code</p>
                <p className="mt-2 font-display text-4xl font-bold tracking-wider text-white sm:text-5xl">
                  CRAVE<span className="text-brand">001</span>
                </p>
                <div className="mt-6 space-y-3">
                  {['Free delivery × 3', 'Exclusive early access', 'Priority support'].map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-[10px] text-brand">✓</span>
                      <span className="text-sm text-white/50">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
