const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI (lazy initialization to ensure dotenv is loaded first)
let genAI;
function getGenAI() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }
  return genAI;
}

// Helper function to parse AI response
function parseRecommendationResponse(aiResponse, preferences) {
  try {
    // Try to parse JSON from the AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        preferences,
        items: parsed.items || [],
        isFallback: false,
      };
    }

    // Fallback: if JSON parsing fails, return a structured error response
    throw new Error('Could not parse AI response as JSON');
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Return a fallback recommendation based on preferences
    return generateFallbackRecommendations(preferences);
  }
}

// Fallback recommendation generator (used if AI fails)
function generateFallbackRecommendations(preferences) {
  const { craving, mood, preference, budget } = preferences;

  const fallbackItems = [
    {
      id: 'rec-1',
      name: getFallbackDish(craving, preference),
      restaurant: 'Crave Now Kitchen',
      price: Math.min(budget, 199),
      originalPrice: Math.min(budget + 50, 249),
      image: getFallbackImage(craving),
      prepTime: '20-25 min',
      calories: 350,
      ingredients: ['Fresh ingredients', 'Spices', 'Herbs'],
      matchReason: getMatchReason(craving, mood),
    },
    {
      id: 'rec-2',
      name: getAlternativeDish(craving, preference),
      restaurant: 'Crave Now Kitchen',
      price: Math.min(budget, 149),
      originalPrice: Math.min(budget + 40, 189),
      image: getAlternativeImage(craving),
      prepTime: '15-20 min',
      calories: 280,
      ingredients: ['Quality ingredients', 'Aromatic spices'],
      matchReason: `Perfect for your ${mood} mood and ${craving} craving`,
    },
    {
      id: 'rec-3',
      name: getThirdDish(craving, preference),
      restaurant: 'Crave Now Kitchen',
      price: Math.min(budget - 50, 129),
      originalPrice: Math.min(budget, 179),
      image: getThirdImage(craving),
      prepTime: '25-30 min',
      calories: 420,
      ingredients: ['Premium ingredients', 'Special sauce'],
      matchReason: `A satisfying ${craving} option within your budget`,
    },
  ];

  return {
    preferences,
    items: fallbackItems,
    isFallback: true,
    note: 'AI generation failed, showing fallback recommendations',
  };
}

function getFallbackDish(craving, preference) {
  const dishes = {
    'Spicy': preference === 'Veg' ? 'Spicy Paneer Tikka' : 'Spicy Chicken Biryani',
    'Sweet': preference === 'Veg' ? 'Gulab Jamun' : 'Rasmalai',
    'Healthy': preference === 'Veg' ? 'Quinoa Salad Bowl' : 'Grilled Chicken Salad',
    'Comfort Food': preference === 'Veg' ? 'Butter Paneer Masala' : 'Chicken Butter Masala',
    'Protein Rich': preference === 'Veg' ? 'Soy Chunk Curry' : 'Grilled Chicken Breast',
    'Quick Snack': preference === 'Veg' ? 'Samosa (2 pcs)' : 'Chicken Roll',
    'Refreshing': preference === 'Veg' ? 'Mango Lassi' : 'Mint Cooler',
    'Cheesy': preference === 'Veg' ? 'Cheese Corn Sandwich' : 'Cheesy Chicken Wrap',
    'Indian Food': preference === 'Veg' ? 'Dal Makhani' : 'Butter Chicken',
    'Dessert': preference === 'Veg' ? 'Chocolate Brownie' : 'Chocolate Mousse',
  };
  return dishes[craving] || 'Mixed Veg Platter';
}

function getAlternativeDish(craving, preference) {
  const dishes = {
    'Spicy': preference === 'Veg' ? 'Chilli Paneer' : 'Chilli Chicken',
    'Sweet': preference === 'Veg' ? 'Rasgulla' : 'Kheer',
    'Healthy': preference === 'Veg' ? 'Sprouts Salad' : 'Egg White Omelette',
    'Comfort Food': preference === 'Veg' ? 'Veg Pulao' : 'Chicken Fried Rice',
    'Protein Rich': preference === 'Veg' ? 'Dal Tadka' : 'Egg Curry',
    'Quick Snack': preference === 'Veg' ? 'Veg Sandwich' : 'Egg Sandwich',
    'Refreshing': preference === 'Veg' ? 'Fresh Fruit Bowl' : 'Coconut Water',
    'Cheesy': preference === 'Veg' ? 'Cheese Dosa' : 'Cheese Naan',
    'Indian Food': preference === 'Veg' ? 'Palak Paneer' : 'Mutton Rogan Josh',
    'Dessert': preference === 'Veg' ? 'Ice Cream' : 'Gajar Ka Halwa',
  };
  return dishes[craving] || 'Veg Fried Rice';
}

function getThirdDish(craving, preference) {
  const dishes = {
    'Spicy': preference === 'Veg' ? 'Vindaloo' : 'Spicy Fish Curry',
    'Sweet': preference === 'Veg' ? 'Jalebi' : 'Shahi Tukda',
    'Healthy': preference === 'Veg' ? 'Mixed Veg Curry' : 'Grilled Fish',
    'Comfort Food': preference === 'Veg' ? 'Chole Bhature' : 'Mutton Biryani',
    'Protein Rich': preference === 'Veg' ? 'Rajma Chawal' : 'Tandoori Chicken',
    'Quick Snack': preference === 'Veg' ? 'Pakora' : 'Kebab',
    'Refreshing': preference === 'Veg' ? 'Cucumber Salad' : 'Buttermilk',
    'Cheesy': preference === 'Veg' ? 'Mac and Cheese' : 'Cheese Burger',
    'Indian Food': preference === 'Veg' ? 'Biryani' : 'Kadai Chicken',
    'Dessert': preference === 'Veg' ? 'Kheer' : 'Phirni',
  };
  return dishes[craving] || 'Paneer Tikka';
}

function getFallbackImage(craving) {
  const images = {
    'Spicy': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    'Sweet': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
    'Healthy': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'Comfort Food': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'Protein Rich': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    'Quick Snack': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'Refreshing': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
    'Cheesy': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'Indian Food': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    'Dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
  };
  return images[craving] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
}

function getAlternativeImage(craving) {
  return 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop';
}

function getThirdImage(craving) {
  return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
}

function getMatchReason(craving, mood) {
  const reasons = {
    'Spicy': `Perfect for your ${mood} mood - the spice will give you an energy boost!`,
    'Sweet': `A sweet treat to lift your ${mood} spirits and bring joy`,
    'Healthy': `Nourishing choice that will help you feel better when ${mood}`,
    'Comfort Food': `Classic comfort food that's perfect for when you're feeling ${mood}`,
    'Protein Rich': `High protein to give you energy and help with your ${mood} mood`,
    'Quick Snack': `Quick and satisfying - perfect for your ${mood} state`,
    'Refreshing': `Refreshing choice to help you feel rejuvenated when ${mood}`,
    'Cheesy': `Cheesy goodness that's sure to improve your ${mood} mood`,
    'Indian Food': `Authentic Indian flavors that match your ${craving} craving perfectly`,
    'Dessert': `A delightful dessert to brighten your ${mood} day`,
  };
  return reasons[craving] || `Matches your ${craving} craving and ${mood} mood`;
}

// Generate food recommendations using Google Gemini AI
router.post('/recommend', async (req, res) => {
  try {
    const { craving, mood, preference, budget, haveIngredients, avoidIngredients } = req.body;

    // Validate required fields
    if (!craving || !mood || !preference || !budget) {
      return res.status(400).json({ 
        error: 'Missing required fields: craving, mood, preference, budget' 
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured, using fallback recommendations');
      const fallbackRecs = generateFallbackRecommendations({
        craving,
        mood,
        preference,
        budget,
        haveIngredients,
        avoidIngredients,
      });
      return res.json(fallbackRecs);
    }

    // Construct the prompt for Gemini
    const prompt = `You are a food recommendation AI for Crave Now, an Indian food delivery service. Generate personalized food recommendations based on the user's preferences:

User Preferences:
- Craving: ${craving}
- Current Mood: ${mood}
- Food Preference: ${preference}
- Budget: ₹${budget}
- Ingredients they have: ${haveIngredients || 'None specified'}
- Ingredients to avoid: ${avoidIngredients || 'None'}

Generate 3-5 food recommendations that match the craving and mood, within the budget of ₹${budget}, and respect the ${preference} dietary preference.

For each recommendation, include:
- A realistic dish name that would be available at an Indian food delivery service
- Restaurant name (use realistic Indian restaurant names like "Spice Kitchen", "Delight Bites", "Flavor House")
- Price in Indian Rupees (₹) - must be within ₹${budget} budget
- Original price (for showing discount)
- Image URL (use relevant food image URLs from unsplash.com)
- Preparation time (e.g., "20-25 min")
- Calories (integer)
- List of 3-5 key ingredients
- A brief reason why this matches the craving and mood (1-2 sentences)

Return the response in this exact JSON format:
{
  "items": [
    {
      "id": "unique_id",
      "name": "dish name",
      "restaurant": "restaurant name",
      "price": number,
      "originalPrice": number,
      "image": "https://images.unsplash.com/photo-xxxxx",
      "prepTime": "time range",
      "calories": number,
      "ingredients": ["ingredient1", "ingredient2", ...],
      "matchReason": "reason for recommendation"
    }
  ]
Important guidelines:
- All prices must be in Indian Rupees (₹) and within the ₹${budget} budget
- All dishes must match the ${preference} dietary requirement
- Avoid any ingredients mentioned in "ingredients to avoid"
- Use ingredients mentioned in "ingredients they have" when possible
- Images should be relevant to the dish type
- Focus on Indian cuisine but can include other cuisines if they match the craving
- Make the matchReason personalized to the ${craving} craving and ${mood} mood`;

    // Call Gemini API
    const model = getGenAI().getGenerativeModel({ model: 'gemini-3.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response
    const recommendations = parseRecommendationResponse(text, {
      craving,
      mood,
      preference,
      budget,
      haveIngredients,
      avoidIngredients,
    });

    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations with Gemini:', error);

    // Fallback to mock recommendations if AI fails
    const { craving, mood, preference, budget, haveIngredients, avoidIngredients } = req.body;
    const fallbackRecs = generateFallbackRecommendations({
      craving,
      mood,
      preference,
      budget,
      haveIngredients,
      avoidIngredients,
    });

    // Return fallback with a note
    res.json({
      ...fallbackRecs,
      note: 'AI generation failed, showing fallback recommendations',
    });
  }
});

module.exports = router;
