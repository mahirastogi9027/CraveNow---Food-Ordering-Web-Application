import { useState } from 'react';
import MealPlanCard from './MealPlanCard';
import { formatINR } from '../../utils/currency';

export default function MealPlanDisplay({ mealPlan, onRegenerate, onSave }) {
  const [addedToCart, setAddedToCart] = useState(null);

  const handleAddToCart = (mealName) => {
    setAddedToCart(mealName);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleAddAllToCart = () => {
    // This would add all meals to cart in a real implementation
    // For now, we'll just show a success message
    setAddedToCart('All meals');
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {addedToCart && (
        <div className="animate-scale-in rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center">
          <p className="text-sm font-medium text-green-700">
            ✓ {addedToCart === 'All meals' ? 'All meals added to cart!' : `${addedToCart} added to cart!`}
          </p>
        </div>
      )}

      {/* Fallback Notice */}
      {mealPlan.isFallback && (
        <div className="animate-scale-in rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-700">
            ℹ️ Using fallback meal plan. {mealPlan.note || 'AI generation is not currently available.'}
          </p>
        </div>
      )}

      {/* Summary Card */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Your Personalized Meal Plan</h2>
            <p className="mt-1 text-sm text-muted">
              Based on your {mealPlan.preferences.healthGoal} goal and {mealPlan.preferences.foodPreference} preference
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
            >
              Regenerate
            </button>
            {onSave && (
              <button
                type="button"
                onClick={onSave}
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand/90"
              >
                Save Plan
              </button>
            )}
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-black/[0.02] p-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="font-mono text-2xl font-semibold text-ink">{mealPlan.totalCalories}</p>
            <p className="text-xs text-muted">Total Calories</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl font-semibold text-ink">{mealPlan.totalProtein}g</p>
            <p className="text-xs text-muted">Total Protein</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl font-semibold text-ink">{mealPlan.totalCarbs}g</p>
            <p className="text-xs text-muted">Total Carbs</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-2xl font-semibold text-brand">{formatINR(mealPlan.totalPrice)}</p>
            <p className="text-xs text-muted">Total Price</p>
          </div>
        </div>

        {/* Health Recommendations */}
        {mealPlan.healthRecommendations && mealPlan.healthRecommendations.length > 0 && (
          <div className="mt-6 rounded-2xl bg-brand/5 p-4">
            <h3 className="font-display text-sm font-semibold text-ink">Health Recommendations</h3>
            <ul className="mt-3 space-y-2">
              {mealPlan.healthRecommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Meal Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MealPlanCard
          meal={mealPlan.meals.breakfast}
          mealType="Breakfast"
          onAddToCart={handleAddToCart}
        />
        <MealPlanCard
          meal={mealPlan.meals.lunch}
          mealType="Lunch"
          onAddToCart={handleAddToCart}
        />
        <MealPlanCard
          meal={mealPlan.meals.dinner}
          mealType="Dinner"
          onAddToCart={handleAddToCart}
        />
        {mealPlan.meals.snack && (
          <MealPlanCard
            meal={mealPlan.meals.snack}
            mealType="Snack"
            onAddToCart={handleAddToCart}
          />
        )}
        {mealPlan.meals.eveningSnack && (
          <MealPlanCard
            meal={mealPlan.meals.eveningSnack}
            mealType="Evening Snack"
            onAddToCart={handleAddToCart}
          />
        )}
      </div>

      {/* Add All Button */}
      <button
        type="button"
        onClick={handleAddAllToCart}
        className="w-full rounded-2xl border-2 border-dashed border-brand/30 bg-brand/5 px-6 py-4 text-base font-semibold text-brand transition-all hover:border-brand hover:bg-brand hover:text-white active:scale-[0.98]"
      >
        Add All Meals to Cart
      </button>
    </div>
  );
}
