const express = require('express');
const { featuredFoods, categories } = require('../data/foods');
const mealPlanRoutes = require('./mealPlan');
const craveAIRoutes = require('./craveAI');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Crave Now API' });
});

router.get('/featured', (_req, res) => {
  res.json(featuredFoods);
});

router.get('/categories', (_req, res) => {
  res.json(categories);
});

router.use('/meal-plan', mealPlanRoutes);
router.use('/crave-ai', craveAIRoutes);

module.exports = router;
