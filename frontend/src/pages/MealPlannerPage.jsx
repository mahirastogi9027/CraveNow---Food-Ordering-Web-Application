import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MealPlannerForm from '../components/mealplanner/MealPlannerForm';
import MealPlanDisplay from '../components/mealplanner/MealPlanDisplay';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function MealPlannerPage() {
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const handleGenerateMealPlan = async (preferences) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/meal-plan/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate meal plan');
      }

      const plan = await response.json();
      setMealPlan(plan);
    } catch (err) {
      setError(err.message || 'Failed to generate meal plan. Please try again.');
      console.error('Error generating meal plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (mealPlan) {
      handleGenerateMealPlan(mealPlan.preferences);
    }
  };

  const handleSavePlan = () => {
    if (!isAuthenticated) {
      alert('Please log in to save your meal plans.');
      return;
    }

    // In a real implementation, this would save to the backend
    const savedPlans = JSON.parse(localStorage.getItem('cravenow-meal-plans') || '[]');
    savedPlans.push(mealPlan);
    localStorage.setItem('cravenow-meal-plans', JSON.stringify(savedPlans));
    alert('Meal plan saved successfully!');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-void pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // AI Powered
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            AI Meal Planner
          </h1>
          <p className="animate-fade-up-d2 mt-4 max-w-lg text-[15px] text-white/60">
            Get personalized meal recommendations based on your health goals, preferences, and budget.
            Powered by AI for optimal nutrition.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {!mealPlan ? (
          <div className="animate-fade-up-d3 -mt-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-ink">Customize Your Meal Plan</h2>
              <p className="mt-2 text-sm text-muted">
                Tell us about your preferences and we'll create a personalized meal plan just for you.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <MealPlannerForm onSubmit={handleGenerateMealPlan} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-scale-in">
            <MealPlanDisplay
              mealPlan={mealPlan}
              onRegenerate={handleRegenerate}
              onSave={handleSavePlan}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
