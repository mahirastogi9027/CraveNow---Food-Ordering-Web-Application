const express = require('express');
const cors = require('cors');
const path = require('path');
process.on('exit', (code) => {
  console.log('>>> PROCESS EXITING with code:', code);
  console.trace('>>> Exit trace');
});
process.on('SIGINT', () => {
  console.log('>>> Received SIGINT (Ctrl+C or external signal)');
});
process.on('SIGTERM', () => {
  console.log('>>> Received SIGTERM (external kill signal)');
});
console.log("Gemini Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Verify Gemini API key is loaded
console.log('Checking Gemini API Key configuration:');
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.warn('⚠️  Gemini API Key is NOT configured properly! Using fallback recommendations.');
} else {
  console.log('✅ Gemini API Key loaded successfully!');
  console.log('Key length:', process.env.GEMINI_API_KEY.length);
  console.log('Key prefix:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
}

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Crave Now API is running' });
});

// Test endpoint for Gemini API
app.get('/api/test-gemini', async (_req, res) => {
  const testResult = {
    envKeyLoaded: !!process.env.GEMINI_API_KEY,
    keyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : null,
    isPlaceholder: process.env.GEMINI_API_KEY === 'your_gemini_api_key_here',
    apiTestSuccess: false,
    apiResponse: null,
    error: null
  };

  if (process.env.GEMINI_API_KEY && !testResult.isPlaceholder) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
      const result = await model.generateContent('Say hello from /api/test-gemini endpoint');
      const response = await result.response;
      testResult.apiTestSuccess = true;
      testResult.apiResponse = response.text();
    } catch (error) {
      testResult.error = {
        message: error.message,
        name: error.constructor.name,
        stack: error.stack
      };
    }
  }

  res.json(testResult);
});

app.use('/api', apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Crave Now backend running on http://localhost:${PORT}`);
});
