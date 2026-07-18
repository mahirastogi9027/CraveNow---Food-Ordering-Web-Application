export default function FoodCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white">
      <div className="aspect-[4/3] animate-skeleton" />
      <div className="space-y-3 p-5">
        <div className="h-2.5 w-24 animate-skeleton rounded" />
        <div className="h-4 w-3/4 animate-skeleton rounded" />
        <div className="flex gap-2">
          <div className="h-3 w-16 animate-skeleton rounded" />
          <div className="h-3 w-20 animate-skeleton rounded" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-14 animate-skeleton rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-20 animate-skeleton rounded-xl" />
            <div className="h-8 w-24 animate-skeleton rounded-xl" />
          </div>
        </div>
      </div>
    </article>
  );
}
