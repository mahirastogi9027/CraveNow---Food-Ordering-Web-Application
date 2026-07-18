export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium transition-all duration-300 active:scale-95 ${
              isActive
                ? 'border-brand bg-brand text-white shadow-[0_0_24px_rgba(255,92,0,0.3)]'
                : 'border-black/[0.08] bg-white text-muted hover:border-brand/30 hover:text-ink hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
            }`}
          >
            <span className="text-base">{cat.emoji}</span>
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
