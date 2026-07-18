import Navbar from '../Navbar';
import Footer from '../Footer';

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      <section className="relative overflow-hidden bg-void pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="animate-fade-up-d2 mx-auto mt-4 max-w-lg text-[15px] text-white/60">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-scale-in -mt-12 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:p-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
