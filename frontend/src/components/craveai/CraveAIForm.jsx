import { useState } from 'react';

const cravings = [
  'Spicy',
  'Sweet',
  'Healthy',
  'Comfort Food',
  'Protein Rich',
  'Quick Snack',
  'Refreshing',
  'Cheesy',
  'Indian Food',
  'Dessert',
];

const moods = ['Happy', 'Tired', 'Stressed', 'Celebrating'];

const preferences = ['Veg', 'Non-Veg', 'Vegan'];

const budgetRanges = [
  { label: 'Under ₹100', value: 'under-100', max: 100 },
  { label: '₹100 - ₹200', value: '100-200', min: 100, max: 200 },
  { label: '₹200 - ₹500', value: '200-500', min: 200, max: 500 },
  { label: 'Custom', value: 'custom' },
];

export default function CraveAIForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    craving: '',
    mood: '',
    preference: '',
    budgetRange: 'under-100',
    customBudget: '',
    haveIngredients: '',
    avoidIngredients: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let budget;
    if (formData.budgetRange === 'custom') {
      budget = parseInt(formData.customBudget) || 500;
    } else {
      const range = budgetRanges.find(r => r.value === formData.budgetRange);
      budget = range?.max || 500;
    }

    onSubmit({
      craving: formData.craving,
      mood: formData.mood,
      preference: formData.preference,
      budget,
      haveIngredients: formData.haveIngredients,
      avoidIngredients: formData.avoidIngredients,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Craving Selection */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          What are you craving?
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {cravings.map((craving) => (
            <button
              key={craving}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, craving }))}
              className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                formData.craving === craving
                  ? 'border-brand bg-brand text-white shadow-[0_0_20px_rgba(255,92,0,0.3)]'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {craving}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Selection */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Your current mood
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, mood }))}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                formData.mood === mood
                  ? 'border-brand bg-brand text-white shadow-[0_0_20px_rgba(255,92,0,0.3)]'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Food Preference */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Food preference
        </label>
        <div className="grid grid-cols-3 gap-3">
          {preferences.map((pref) => (
            <button
              key={pref}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, preference: pref }))}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                formData.preference === pref
                  ? 'border-brand bg-brand text-white shadow-[0_0_20px_rgba(255,92,0,0.3)]'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <label className="mb-3 block font-display text-sm font-semibold text-ink">
          Your budget
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {budgetRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, budgetRange: range.value }))}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                formData.budgetRange === range.value
                  ? 'border-brand bg-brand text-white shadow-[0_0_20px_rgba(255,92,0,0.3)]'
                  : 'border-black/[0.08] bg-white text-ink hover:border-brand/50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        {formData.budgetRange === 'custom' && (
          <div className="mt-3">
            <input
              type="number"
              value={formData.customBudget}
              onChange={(e) => setFormData(prev => ({ ...prev, customBudget: e.target.value }))}
              placeholder="Enter your budget in ₹"
              className="w-full rounded-xl border border-black/[0.08] px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="haveIngredients" className="mb-2 block font-display text-sm font-semibold text-ink">
            Ingredients you have
          </label>
          <input
            type="text"
            id="haveIngredients"
            value={formData.haveIngredients}
            onChange={(e) => setFormData(prev => ({ ...prev, haveIngredients: e.target.value }))}
            placeholder="e.g., chicken, rice, tomatoes"
            className="w-full rounded-xl border border-black/[0.08] px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label htmlFor="avoidIngredients" className="mb-2 block font-display text-sm font-semibold text-ink">
            Ingredients to avoid
          </label>
          <input
            type="text"
            id="avoidIngredients"
            value={formData.avoidIngredients}
            onChange={(e) => setFormData(prev => ({ ...prev, avoidIngredients: e.target.value }))}
            placeholder="e.g., onions, garlic"
            className="w-full rounded-xl border border-black/[0.08] px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formData.craving || !formData.mood || !formData.preference}
        className="w-full rounded-xl bg-brand py-4 text-sm font-semibold text-white transition hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Getting recommendations...
          </span>
        ) : (
          'Get AI Recommendations'
        )}
      </button>
    </form>
  );
}
