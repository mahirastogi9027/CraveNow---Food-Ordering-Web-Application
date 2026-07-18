const featuredFoods = [
  {
    id: 1,
    name: 'Truffle Mushroom Pizza',
    restaurant: 'La Piazza',
    price: 549,
    rating: 4.8,
    deliveryTime: '25-30 min',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    tag: 'Trending',
  },
  {
    id: 2,
    name: 'Spicy Dragon Roll',
    restaurant: 'Sakura Sushi',
    price: 449,
    rating: 4.9,
    deliveryTime: '20-25 min',
    image:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',
    tag: 'Chef Special',
  },
  {
    id: 3,
    name: 'Classic Smash Burger',
    restaurant: 'Burger & Co.',
    price: 349,
    rating: 4.7,
    deliveryTime: '15-20 min',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    tag: 'Best Seller',
  },
  {
    id: 4,
    name: 'Mediterranean Bowl',
    restaurant: 'Green Fork',
    price: 299,
    rating: 4.6,
    deliveryTime: '20-25 min',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    tag: 'Healthy',
  },
];

const categories = [
  {
    id: 1,
    name: 'Pizza',
    count: 120,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Burgers',
    count: 85,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Sushi',
    count: 64,
    image:
      'https://images.unsplash.com/photo-1579876437925-a447d8a03c42?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Desserts',
    count: 92,
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Healthy',
    count: 78,
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Drinks',
    count: 56,
    image:
      'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop',
  },
];

module.exports = { featuredFoods, categories };
