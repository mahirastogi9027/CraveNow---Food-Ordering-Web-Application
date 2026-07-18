const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('=== Gemini API Integration Test ===\n');

// Wrap in async IIFE to allow await
(async () => {
  // 1. Verify that backend is loading the key from .env file
  console.log('Step 1: Verifying .env file loading:');
  console.log('   .env file path:', path.join(__dirname, '.env'));

  // 2. Print whether process.env.GEMINI_API_KEY exists
  console.log('\nStep 2: Checking process.env.GEMINI_API_KEY:');
  console.log('   Exists:', !!process.env.GEMINI_API_KEY);
  if (process.env.GEMINI_API_KEY) {
    console.log('   Key length:', process.env.GEMINI_API_KEY.length);
    console.log('   Prefix (first 10 chars):', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
  } else {
    console.log('   ❌ process.env.GEMINI_API_KEY is NOT set');
    process.exit(1);
  }

  // 3. Make a real test request to Gemini API
  console.log('\nStep 3: Making real test request to Gemini API...');
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log('   Using model: gemini-1.5-flash');
      console.log('   Sending prompt: "Say hello from Gemini API integration test"');
      
      const result = await model.generateContent('Say hello from Gemini API integration test');
      const response = await result.response;
      const text = response.text();
      console.log('\n✅ Test request SUCCESSFUL!');
      console.log('   Response:', text);
      
      // Now test the exact same route logic used in craveAI.js
      console.log('\nStep 4: Testing the exact code path from /api/crave-ai/recommend...');
      
      // Now let's test what happens in craveAI.js's route handler
      console.log('   Testing route handler logic:');
      console.log('   Checking if key is considered configured in route:', 
        !(process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') 
        ? '✓ Yes, key is valid (not placeholder)' 
        : '✗ No, key is placeholder'
      );

    } catch (error) {
      console.error('\n❌ Test request FAILED!');
      console.error('   Error type:', error.constructor.name);
      console.error('   Error message:', error.message);
      if (error.response) {
        console.error('   Response status:', error.response.status);
        console.error('   Response data:', error.response.data);
      }
      process.exit(1);
    }
  }
})();

