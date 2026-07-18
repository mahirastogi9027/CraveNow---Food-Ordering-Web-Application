export default function MenuSearchBar({ value, onChange, resultCount }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dishes, restaurants..."
        className="w-full rounded-2xl border border-black/[0.08] bg-white py-3.5 pl-11 pr-4 text-sm text-ink shadow-[0_4px_24px_rgba(0,0,0,0.04)] outline-none transition-all duration-300 placeholder:text-subtle focus:border-brand/40 focus:shadow-[0_4px_32px_rgba(255,92,0,0.12)] focus:ring-2 focus:ring-brand/10"
        aria-label="Search menu items"
      />
      {value && (
        <p className="mt-2 font-mono text-[11px] text-muted">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      )}
    </div>
  );
}
