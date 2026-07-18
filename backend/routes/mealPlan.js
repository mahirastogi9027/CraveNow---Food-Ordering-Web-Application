const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper function to parse AI response
function parseMealPlanResponse(aiResponse, preferences) {
  try {
    // Try to parse JSON from the AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        preferences,
        meals: parsed.meals || {},
        totalCalories: parsed.totalCalories || 0,
        totalProtein: parsed.totalProtein || 0,
        totalCarbs: parsed.totalCarbs || 0,
        totalPrice: parsed.totalPrice || 0,
        healthRecommendations: parsed.healthRecommendations || [],
      };
    }

    // Fallback: if JSON parsing fails, return a structured error response
    throw new Error('Could not parse AI response as JSON');
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Return a fallback meal plan based on preferences
    return generateFallbackMealPlan(preferences);
  }
}

// Fallback meal plan generator (used if AI fails)
function generateFallbackMealPlan(preferences) {
  const { mealCount, foodPreference, budgetRange } = preferences;

  const fallbackMeals = {
    breakfast: {
      id: 'bf-fallback',
      name: foodPreference === 'vegan' ? 'Oatmeal with Fruits' : 'Avocado Toast',
      calories: 300,
      protein: 12,
      carbs: 35,
      fat: 10,
      price: 249,
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: foodPreference,
      reason: 'Balanced breakfast to start your day',
    },
    lunch: {
      id: 'l-fallback',
      name: foodPreference === 'vegan' ? 'Quinoa Bowl' : 'Grilled Chicken Salad',
      calories: 400,
      protein: 25,
      carbs: 30,
      fat: 18,
      price: 399,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: foodPreference,
      reason: 'Protein-rich lunch for sustained energy',
    },
    dinner: {
      id: 'd-fallback',
      name: foodPreference === 'vegan' ? 'Vegetable Stir Fry' : 'Grilled Salmon',
      calories: 450,
      protein: 30,
      carbs: 25,
      fat: 22,
      price: 499,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      cuisine: 'Mediterranean',
      preference: foodPreference,
      reason: 'Nutritious dinner for recovery',
    },
  };

  if (mealCount >= 4) {
    fallbackMeals.snack = {
      id: 's-fallback',
      name: 'Mixed Nuts',
      calories: 200,
      protein: 6,
      carbs: 15,
      fat: 14,
      price: 199,
      image: 'https://images.unsplash.com/photo-1603023279728-aa966dc4a13e?w=400&h=300&fit=crop',
      cuisine: 'American',
      preference: foodPreference,
      reason: 'Healthy snack for energy',
    };
  }

  const totalCalories = fallbackMeals.breakfast.calories + fallbackMeals.lunch.calories + fallbackMeals.dinner.calories +
    (fallbackMeals.snack ? fallbackMeals.snack.calories : 0);
  const totalProtein = fallbackMeals.breakfast.protein + fallbackMeals.lunch.protein + fallbackMeals.dinner.protein +
    (fallbackMeals.snack ? fallbackMeals.snack.protein : 0);
  const totalCarbs = fallbackMeals.breakfast.carbs + fallbackMeals.lunch.carbs + fallbackMeals.dinner.carbs +
    (fallbackMeals.snack ? fallbackMeals.snack.carbs : 0);
  const totalPrice = fallbackMeals.breakfast.price + fallbackMeals.lunch.price + fallbackMeals.dinner.price +
    (fallbackMeals.snack ? fallbackMeals.snack.price : 0);

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    preferences,
    meals: fallbackMeals,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalPrice,
    healthRecommendations: ['Stay hydrated', 'Eat at regular intervals', 'Include variety in your diet'],
    isFallback: true,
  };
}

// Generate meal plan using Google Gemini AI
router.post('/generate', async (req, res) => {
  try {
    const { healthGoal, foodPreference, mealCount, budgetRange, allergies, cuisines } = req.body;

    // Validate required fields
    if (!healthGoal || !foodPreference || !mealCount || !budgetRange) {
      return res.status(400).json({ 
        error: 'Missing required fields: healthGoal, foodPreference, mealCount, budgetRange' 
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured, using fallback meal plan');
      const fallbackPlan = generateFallbackMealPlan({
        healthGoal,
        foodPreference,
        mealCount,
        budgetRange,
        allergies: allergies || [],
        cuisines: cuisines || [],
      });
      return res.json(fallbackPlan);
    }

    // Construct the prompt for Gemini
    const prompt = `You are a professional nutritionist and meal planner for Crave Now, a food delivery service. Generate a personalized daily meal plan based on the following preferences:

Health Goal: ${healthGoal}
Food Preference: ${foodPreference}
Number of Meals: ${mealCount}
Budget Range: ${budgetRange} (in Indian Rupees, INR)
Allergies/Dislikes: ${allergies && allergies.length > 0 ? allergies.join(', ') : 'None'}
Favorite Cuisines: ${cuisines && cuisines.length > 0 ? cuisines.join(', ') : 'Any'}

Generate a meal plan with the following structure:
- Breakfast (with calories, protein in grams, carbs in grams, fat in grams, price in INR, cuisine type, and a brief reason why it's recommended)
- Lunch (same structure)
- Dinner (same structure)
- Snack (include if mealCount >= 4, same structure)
- Evening Snack (include if mealCount >= 5, same structure)

For each meal, include:
- A realistic dish name that would be available at a food delivery service
- Calories (integer)
- Protein in grams (integer)
- Carbs in grams (integer)
- Fat in grams (integer)
- Price in INR (decimal, realistic for food delivery in India)
- Cuisine type (e.g., Indian, Italian, Asian, Mediterranean, American, etc.)
- A brief reason why this meal is recommended (1-2 sentences)

Also include:
- Total calories for the day
- Total protein in grams
- Total carbs in grams
- Total price in INR
- 3-5 health recommendations based on the health goal

Return the response in this exact JSON format:
{
  "meals": {
    "breakfast": {
      "id": "unique_id",
      "name": "dish name",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "price": number,
      "image": "https://images.unsplash.com/photo-xxxxx (use a relevant food image URL)",
      "cuisine": "cuisine type",
      "preference": "${foodPreference}",
      "reason": "reason for recommendation"
    },
    "lunch": { ... },
    "dinner": { ... },
    "snack": { ... } (if applicable)
  },
  "totalCalories": number,
  "totalProtein": number,
  "totalCarbs": number,
  "totalPrice": number,
  "healthRecommendations": ["recommendation1", "recommendation2", ...]
}

Ensure all meals match the ${foodPreference} dietary requirement and avoid any mentioned allergies. Keep prices realistic for a food delivery service within the ${budgetRange} budget range (in INR).`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response
    const mealPlan = parseMealPlanResponse(text, {
      healthGoal,
      foodPreference,
      mealCount,
      budgetRange,
      allergies: allergies || [],
      cuisines: cuisines || [],
    });

    res.json(mealPlan);
  } catch (error) {
    console.error('Error generating meal plan with Gemini:', error);

    // Fallback to mock meal plan if AI fails
    const { healthGoal, foodPreference, mealCount, budgetRange, allergies, cuisines } = req.body;
    const fallbackPlan = generateFallbackMealPlan({
      healthGoal,
      foodPreference,
      mealCount,
      budgetRange,
      allergies: allergies || [],
      cuisines: cuisines || [],
    });

    // Return fallback with a note
    res.json({
      ...fallbackPlan,
      note: 'AI generation failed, showing fallback meal plan',
    });
  }
});

// Save meal plan for logged-in users (ready for backend integration)
router.post('/save', (req, res) => {
  try {
    const { userId, mealPlan } = req.body;

    if (!userId || !mealPlan) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, mealPlan' 
      });
    }

    // In the future, this would save to a database
    // For now, return success
    res.json({ 
      message: 'Meal plan saved successfully',
      note: 'This is a mock response. Connect to a database for persistent storage.' 
    });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ error: 'Failed to save meal plan' });
  }
});

// Get saved meal plans for a user (ready for backend integration)
router.get('/saved/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    // In the future, this would fetch from a database
    // For now, return empty array
    res.json({ 
      mealPlans: [],
      note: 'This is a mock response. Connect to a database for persistent storage.' 
    });
  } catch (error) {
    console.error('Error fetching saved meal plans:', error);
    res.status(500).json({ error: 'Failed to fetch saved meal plans' });
  }
});

module.exports = router;
