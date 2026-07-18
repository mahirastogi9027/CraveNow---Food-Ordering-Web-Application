import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';

export default function MealPlanCard({ meal, mealType, onAddToCart }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: meal.id,
      name: meal.name,
      restaurant: meal.cuisine,
      price: meal.price,
      image: meal.image,
    });
    onAddToCart?.(meal.name);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-brand/30">
      <div className="relative h-40 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
          {mealType}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-ink">{meal.name}</h3>
        <p className="mt-1 text-xs text-muted">{meal.cuisine} · {meal.preference}</p>

        <div className="mt-3 grid grid-cols-4 gap-2 rounded-xl bg-black/[0.02] p-2">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold text-ink">{meal.calories}</p>
            <p className="text-[10px] text-muted">cal</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold text-ink">{meal.protein}g</p>
            <p className="text-[10px] text-muted">protein</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold text-ink">{meal.carbs}g</p>
            <p className="text-[10px] text-muted">carbs</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold text-brand">{formatINR(meal.price)}</p>
            <p className="text-[10px] text-muted">price</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted italic">"{meal.reason}"</p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-xl border border-brand/30 bg-brand/5 px-4 py-2.5 text-sm font-medium text-brand transition-all hover:bg-brand hover:text-white active:scale-[0.97]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
