import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CraveAIForm from '../components/craveai/CraveAIForm';
import CraveAIRecommendationCard from '../components/craveai/CraveAIRecommendationCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CraveAIPage() {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);

  const handleGetRecommendations = async (preferences) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/crave-ai/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message || 'Failed to get recommendations. Please try again.');
      console.error('Error getting recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (itemName) => {
    setAddedToCart(itemName);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleReset = () => {
    setRecommendations(null);
    setError(null);
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
            Crave AI
          </h1>
          <p className="animate-fade-up-d2 mt-4 max-w-lg text-[15px] text-white/60">
            Tell us what you're craving and let AI find the perfect dish for you. Personalized recommendations based on your mood, preferences, and budget.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {!recommendations ? (
          <div className="animate-fade-up-d3 -mt-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-ink">What are you craving today?</h2>
              <p className="mt-2 text-sm text-muted">
                Answer a few questions and let our AI find the perfect dish for you.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <CraveAIForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-scale-in space-y-6">
            {/* Success Toast */}
            {addedToCart && (
              <div className="animate-scale-in rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-green-700">✓ {addedToCart} added to cart!</p>
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">Your AI Recommendations</h2>
                <p className="mt-1 text-sm text-muted">
                  Based on your craving for "{recommendations.preferences?.craving}" and mood "{recommendations.preferences?.mood}"
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                Start Over
              </button>
            </div>

            {/* Fallback Notice */}
            {recommendations.isFallback && (
              <div className="animate-scale-in rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm font-medium text-amber-700">
                  ℹ️ Using fallback recommendations. {recommendations.note || 'AI generation is not currently available.'}
                </p>
              </div>
            )}

            {/* Recommendations Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.items?.map((item, index) => (
                <div key={item.id || index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CraveAIRecommendationCard
                    recommendation={item}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
