const API_BASE = '/api';

export async function fetchFeaturedFoods() {
  const response = await fetch(`${API_BASE}/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured foods');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}
