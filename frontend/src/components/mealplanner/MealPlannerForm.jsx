import { useState } from 'react';
import {
  HEALTH_GOALS,
  FOOD_PREFERENCES,
  MEAL_COUNTS,
  BUDGET_RANGES,
  COMMON_ALLERGIES,
  CUISINE_PREFERENCES,
} from '../../data/mealPlanData';

export default function MealPlannerForm({ onSubmit, isLoading }) {
  const [healthGoal, setHealthGoal] = useState('balanced');
  const [foodPreference, setFoodPreference] = useState('non-vegetarian');
  const [mealCount, setMealCount] = useState(3);
  const [budgetRange, setBudgetRange] = useState('medium');
  const [allergies, setAllergies] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [customAllergy, setCustomAllergy] = useState('');

  const toggleAllergy = (allergy) => {
    setAllergies(prev =>
      prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleCuisine = (cuisine) => {
    setCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      healthGoal,
      foodPreference,
      mealCount,
      budgetRange,
      allergies,
      cuisines,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Health Goal */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Health Goal
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {HEALTH_GOALS.map(goal => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setHealthGoal(goal.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                healthGoal === goal.id
                  ? 'border-brand bg-brand/5 ring-2 ring-brand/20'
                  : 'border-black/[0.08] bg-white hover:border-brand/50'
              }`}
            >
              <p className="font-medium text-ink">{goal.label}</p>
              <p className="mt-1 text-xs text-muted">{goal.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Food Preference */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Food Preference
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {FOOD_PREFERENCES.map(pref => (
            <button
              key={pref.id}
              type="button"
              onClick={() => setFoodPreference(pref.id)}
              className={`rounded-xl border p-4 text-center transition-all ${
                foodPreference === pref.id
                  ? 'border-brand bg-brand/5 ring-2 ring-brand/20'
                  : 'border-black/[0.08] bg-white hover:border-brand/50'
              }`}
            >
              <span className="text-2xl">{pref.icon}</span>
              <p className="mt-2 font-medium text-ink">{pref.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Meal Count */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Meals Per Day
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {MEAL_COUNTS.map(count => (
            <button
              key={count.id}
              type="button"
              onClick={() => setMealCount(count.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                mealCount === count.id
                  ? 'border-brand bg-brand/5 ring-2 ring-brand/20'
                  : 'border-black/[0.08] bg-white hover:border-brand/50'
              }`}
            >
              <p className="font-medium text-ink">{count.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Budget Range
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {BUDGET_RANGES.map(budget => (
            <button
              key={budget.id}
              type="button"
              onClick={() => setBudgetRange(budget.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                budgetRange === budget.id
                  ? 'border-brand bg-brand/5 ring-2 ring-brand/20'
                  : 'border-black/[0.08] bg-white hover:border-brand/50'
              }`}
            >
              <p className="font-medium text-ink">{budget.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Allergies / Disliked Ingredients
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map(allergy => (
            <button
              key={allergy}
              type="button"
              onClick={() => toggleAllergy(allergy)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                allergies.includes(allergy)
                  ? 'border-brand bg-brand text-white'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAllergy())}
            placeholder="Add custom allergy..."
            className="flex-1 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="button"
            onClick={addCustomAllergy}
            className="rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand/90"
          >
            Add
          </button>
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Favorite Cuisines (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_PREFERENCES.map(cuisine => (
            <button
              key={cuisine}
              type="button"
              onClick={() => toggleCuisine(cuisine)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                cuisines.includes(cuisine)
                  ? 'border-brand bg-brand text-white'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-brand px-6 py-4 text-base font-semibold text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(255,92,0,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating Your Meal Plan...
          </span>
        ) : (
          'Generate AI Meal Plan'
        )}
      </button>
    </form>
  );
}
