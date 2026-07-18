import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="animate-fade-up flex flex-col items-center py-16 text-center sm:py-24">
      <div className="relative mb-10">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -left-8 top-8 h-16 w-16 animate-drift rounded-full bg-brand/10 blur-xl" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -right-6 bottom-4 h-12 w-12 animate-drift rounded-full bg-brand/20 blur-lg" style={{ animationDelay: '1s' }} />
        <svg
          className="relative h-52 w-52 sm:h-60 sm:w-60"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cartGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5c00" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ff5c00" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="cartBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fafafa" />
            </linearGradient>
          </defs>

          <circle cx="120" cy="120" r="95" fill="url(#cartGlow)" />
          <circle cx="120" cy="120" r="85" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />

          <path
            d="M75 95h90l-10 70H85l-10-70z"
            fill="url(#cartBody)"
            stroke="#d4d4d8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M68 95h104" stroke="#ff5c00" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 95l8-22h60l8 22" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          <circle cx="95" cy="175" r="7" fill="#71717a" />
          <circle cx="145" cy="175" r="7" fill="#71717a" />
          <circle cx="95" cy="175" r="3" fill="#d4d4d8" />
          <circle cx="145" cy="175" r="3" fill="#d4d4d8" />

          <path
            d="M120 58c-10 0-18 8-18 18"
            stroke="#ff5c00"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="120" cy="52" r="4" fill="#ff5c00" opacity="0.5" />

          <g opacity="0.9">
            <circle cx="168" cy="78" r="22" fill="#ff5c0018" stroke="#ff5c0040" strokeWidth="1.5" />
            <text x="168" y="84" textAnchor="middle" fill="#ff5c00" fontSize="18" fontWeight="700" fontFamily="monospace">
              0
            </text>
          </g>

          <g opacity="0.4">
            <circle cx="52" cy="130" r="3" fill="#ff5c00" />
            <circle cx="188" cy="145" r="2" fill="#ff5c00" />
            <circle cx="60" cy="90" r="2" fill="#ff5c00" />
          </g>
        </svg>
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Empty Cart</span>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Your cart is empty</h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Looks like you haven&apos;t added anything yet. Explore our menu and discover dishes from top restaurants near you.
      </p>

      <Link
        to="/menu"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.97]"
      >
        Browse Menu
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}
