export const HEALTH_GOALS = [
  { id: 'fitness', label: 'Fitness', description: 'High protein, balanced macros for muscle building' },
  { id: 'weight-loss', label: 'Weight Management', description: 'Calorie-conscious, nutrient-dense meals' },
  { id: 'balanced', label: 'Balanced Diet', description: 'Well-rounded nutrition for overall health' },
];

export const FOOD_PREFERENCES = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'non-vegetarian', label: 'Non-vegetarian', icon: '🍗' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
];

export const MEAL_COUNTS = [
  { id: 3, label: '3 Meals (Breakfast, Lunch, Dinner)' },
  { id: 4, label: '4 Meals (Add Snack)' },
  { id: 5, label: '5 Meals (Add Morning & Evening Snack)' },
];

export const BUDGET_RANGES = [
  { id: 'low', label: 'Budget Friendly (₹500-800/day)', min: 500, max: 800 },
  { id: 'medium', label: 'Moderate (₹800-1,500/day)', min: 800, max: 1500 },
  { id: 'high', label: 'Premium (₹1,500-2,500/day)', min: 1500, max: 2500 },
];

export const COMMON_ALLERGIES = [
  'Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Eggs', 'Soy', 'Fish'
];

export const CUISINE_PREFERENCES = [
  'Italian', 'Asian', 'Mexican', 'Indian', 'Mediterranean', 'American', 'Middle Eastern'
];

const mealDatabase = {
  breakfast: [
    {
      id: 'bf1',
      name: 'Avocado Toast with Poached Eggs',
      calories: 320,
      protein: 14,
      carbs: 28,
      fat: 18,
      price: 299,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414394d8?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegetarian',
      reason: 'Rich in healthy fats and protein to start your day',
    },
    {
      id: 'bf2',
      name: 'Greek Yogurt Parfait',
      calories: 280,
      protein: 18,
      carbs: 32,
      fat: 8,
      price: 249,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'vegetarian',
      reason: 'High protein with probiotics for digestive health',
    },
    {
      id: 'bf3',
      name: 'Protein Smoothie Bowl',
      calories: 350,
      protein: 25,
      carbs: 45,
      fat: 10,
      price: 329,
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegan',
      reason: 'Quick energy boost with essential amino acids',
    },
    {
      id: 'bf4',
      name: 'Oatmeal with Berries',
      calories: 300,
      protein: 10,
      carbs: 55,
      fat: 6,
      price: 199,
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegan',
      reason: 'Complex carbs for sustained energy release',
    },
    {
      id: 'bf5',
      name: 'Egg White Omelette',
      calories: 250,
      protein: 22,
      carbs: 8,
      fat: 12,
      price: 279,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'non-vegetarian',
      reason: 'Lean protein source with minimal calories',
    },
  ],
  lunch: [
    {
      id: 'l1',
      name: 'Grilled Chicken Salad',
      calories: 420,
      protein: 35,
      carbs: 18,
      fat: 24,
      price: 449,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'non-vegetarian',
      reason: 'High protein with fresh vegetables for vitamins',
    },
    {
      id: 'l2',
      name: 'Quinoa Buddha Bowl',
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 20,
      price: 399,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      cuisine: 'Asian',
      preference: 'vegan',
      reason: 'Complete protein source with fiber-rich grains',
    },
    {
      id: 'l3',
      name: 'Turkey Wrap',
      calories: 380,
      protein: 28,
      carbs: 35,
      fat: 14,
      price: 349,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'non-vegetarian',
      reason: 'Balanced macros for afternoon energy',
    },
    {
      id: 'l4',
      name: 'Mediterranean Falafel Plate',
      calories: 480,
      protein: 16,
      carbs: 48,
      fat: 26,
      price: 379,
      image: 'https://images.unsplash.com/photo-1547928576-b44122c00b43?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'vegetarian',
      reason: 'Plant-based protein with heart-healthy fats',
    },
    {
      id: 'l5',
      name: 'Tuna Niçoise Salad',
      calories: 400,
      protein: 32,
      carbs: 20,
      fat: 22,
      price: 499,
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop',
      cuisine: 'French',
      preference: 'non-vegetarian',
      reason: 'Omega-3 rich with complete amino acid profile',
    },
  ],
  dinner: [
    {
      id: 'd1',
      name: 'Grilled Salmon with Vegetables',
      calories: 520,
      protein: 38,
      carbs: 22,
      fat: 32,
      price: 699,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'non-vegetarian',
      reason: 'High-quality protein with anti-inflammatory omega-3s',
    },
    {
      id: 'd2',
      name: 'Vegetable Stir Fry with Tofu',
      calories: 380,
      protein: 22,
      carbs: 38,
      fat: 18,
      price: 429,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
      cuisine: 'Asian',
      preference: 'vegan',
      reason: 'Plant-based complete protein with antioxidants',
    },
    {
      id: 'd3',
      name: 'Chicken Breast with Sweet Potato',
      calories: 450,
      protein: 40,
      carbs: 35,
      fat: 14,
      price: 549,
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'non-vegetarian',
      reason: 'Lean protein with complex carbs for recovery',
    },
    {
      id: 'd4',
      name: 'Lentil Curry with Brown Rice',
      calories: 420,
      protein: 18,
      carbs: 58,
      fat: 12,
      price: 399,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      cuisine: 'Indian',
      preference: 'vegan',
      reason: 'High fiber with plant-based protein and iron',
    },
    {
      id: 'd5',
      name: 'Eggplant Parmesan',
      calories: 480,
      protein: 16,
      carbs: 42,
      fat: 28,
      price: 469,
      image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop',
      cuisine: 'Italian',
      preference: 'vegetarian',
      reason: 'Rich in antioxidants with satisfying texture',
    },
  ],
  snacks: [
    {
      id: 's1',
      name: 'Mixed Nuts and Berries',
      calories: 200,
      protein: 6,
      carbs: 18,
      fat: 14,
      price: 149,
      image: 'https://images.unsplash.com/photo-1603023279728-aa966dc4a13e?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegan',
      reason: 'Healthy fats with antioxidants for sustained energy',
    },
    {
      id: 's2',
      name: 'Hummus with Veggies',
      calories: 180,
      protein: 8,
      carbs: 22,
      fat: 8,
      price: 179,
      image: 'https://images.unsplash.com/photo-1633964913295-ceb43826a07f?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'vegan',
      reason: 'Fiber-rich with plant-based protein',
    },
    {
      id: 's3',
      name: 'Greek Yogurt with Honey',
      calories: 160,
      protein: 12,
      carbs: 20,
      fat: 4,
      price: 159,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: 'vegetarian',
      reason: 'Quick protein boost with natural sweetness',
    },
    {
      id: 's4',
      name: 'Protein Bar',
      calories: 220,
      protein: 20,
      carbs: 24,
      fat: 8,
      price: 129,
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegetarian',
      reason: 'Convenient protein source for on-the-go',
    },
    {
      id: 's5',
      name: 'Apple with Almond Butter',
      calories: 190,
      protein: 5,
      carbs: 24,
      fat: 10,
      price: 119,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: 'vegan',
      reason: 'Balanced snack with fiber and healthy fats',
    },
  ],
};

function filterMealsByPreference(meals, preference) {
  if (preference === 'non-vegetarian') return meals;
  if (preference === 'vegetarian') return meals.filter(m => m.preference === 'vegetarian' || m.preference === 'vegan');
  if (preference === 'vegan') return meals.filter(m => m.preference === 'vegan');
  return meals;
}

function filterByAllergies(meals, allergies) {
  if (!allergies || allergies.length === 0) return meals;
  return meals.filter(meal => {
    const mealName = meal.name.toLowerCase();
    return !allergies.some(allergy => mealName.includes(allergy.toLowerCase()));
  });
}

function filterByBudget(meals, budgetRange) {
  const budget = BUDGET_RANGES.find(b => b.id === budgetRange);
  if (!budget) return meals;
  return meals.filter(meal => meal.price <= budget.max);
}

function filterByCuisine(meals, cuisines) {
  if (!cuisines || cuisines.length === 0) return meals;
  return meals.filter(meal => cuisines.includes(meal.cuisine));
}

function getRandomMeal(meals) {
  return meals[Math.floor(Math.random() * meals.length)];
}

export function generateMockMealPlan(preferences) {
  const { healthGoal, foodPreference, mealCount, budgetRange, allergies, cuisines } = preferences;

  let breakfastOptions = filterMealsByPreference(mealDatabase.breakfast, foodPreference);
  let lunchOptions = filterMealsByPreference(mealDatabase.lunch, foodPreference);
  let dinnerOptions = filterMealsByPreference(mealDatabase.dinner, foodPreference);
  let snackOptions = filterMealsByPreference(mealDatabase.snacks, foodPreference);

  breakfastOptions = filterByAllergies(breakfastOptions, allergies);
  lunchOptions = filterByAllergies(lunchOptions, allergies);
  dinnerOptions = filterByAllergies(dinnerOptions, allergies);
  snackOptions = filterByAllergies(snackOptions, allergies);

  breakfastOptions = filterByBudget(breakfastOptions, budgetRange);
  lunchOptions = filterByBudget(lunchOptions, budgetRange);
  dinnerOptions = filterByBudget(dinnerOptions, budgetRange);
  snackOptions = filterByBudget(snackOptions, budgetRange);

  if (cuisines && cuisines.length > 0) {
    breakfastOptions = filterByCuisine(breakfastOptions, cuisines);
    lunchOptions = filterByCuisine(lunchOptions, cuisines);
    dinnerOptions = filterByCuisine(dinnerOptions, cuisines);
    snackOptions = filterByCuisine(snackOptions, cuisines);
  }

  const mealPlan = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    preferences: { ...preferences },
    meals: {
      breakfast: getRandomMeal(breakfastOptions.length > 0 ? breakfastOptions : mealDatabase.breakfast),
      lunch: getRandomMeal(lunchOptions.length > 0 ? lunchOptions : mealDatabase.lunch),
      dinner: getRandomMeal(dinnerOptions.length > 0 ? dinnerOptions : mealDatabase.dinner),
    },
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalPrice: 0,
  };

  mealPlan.totalCalories += mealPlan.meals.breakfast.calories;
  mealPlan.totalProtein += mealPlan.meals.breakfast.protein;
  mealPlan.totalCarbs += mealPlan.meals.breakfast.carbs;
  mealPlan.totalPrice += mealPlan.meals.breakfast.price;

  mealPlan.totalCalories += mealPlan.meals.lunch.calories;
  mealPlan.totalProtein += mealPlan.meals.lunch.protein;
  mealPlan.totalCarbs += mealPlan.meals.lunch.carbs;
  mealPlan.totalPrice += mealPlan.meals.lunch.price;

  mealPlan.totalCalories += mealPlan.meals.dinner.calories;
  mealPlan.totalProtein += mealPlan.meals.dinner.protein;
  mealPlan.totalCarbs += mealPlan.meals.dinner.carbs;
  mealPlan.totalPrice += mealPlan.meals.dinner.price;

  if (mealCount >= 4) {
    mealPlan.meals.snack = getRandomMeal(snackOptions.length > 0 ? snackOptions : mealDatabase.snacks);
    mealPlan.totalCalories += mealPlan.meals.snack.calories;
    mealPlan.totalProtein += mealPlan.meals.snack.protein;
    mealPlan.totalCarbs += mealPlan.meals.snack.carbs;
    mealPlan.totalPrice += mealPlan.meals.snack.price;
  }

  if (mealCount >= 5) {
    mealPlan.meals.eveningSnack = getRandomMeal(snackOptions.length > 0 ? snackOptions : mealDatabase.snacks);
    mealPlan.totalCalories += mealPlan.meals.eveningSnack.calories;
    mealPlan.totalProtein += mealPlan.meals.eveningSnack.protein;
    mealPlan.totalCarbs += mealPlan.meals.eveningSnack.carbs;
    mealPlan.totalPrice += mealPlan.meals.eveningSnack.price;
  }

  return mealPlan;
}
