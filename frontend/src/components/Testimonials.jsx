import { testimonials } from '../data/homeData';

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Voices</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What people are saying
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <article
              key={item.id}
              className="group relative rounded-2xl border border-black/[0.06] bg-white p-7 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            >
              <span className="font-display text-4xl leading-none text-brand/20">&ldquo;</span>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.text}</p>

              <div className="mt-6 flex items-center gap-3 border-t border-black/[0.04] pt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-black/[0.04] transition group-hover:ring-brand/20"
                />
                <div>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="font-mono text-[10px] text-muted">{item.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(item.rating)].map((_, j) => (
                    <span key={j} className="text-[10px] text-brand">★</span>
                  ))}
                </div>
              </div>

              <span className="absolute right-6 top-6 font-mono text-[10px] text-black/[0.06]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
