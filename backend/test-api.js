
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('=== Starting Test ===');

// Step 1: Load .env manually to 100% make sure
const envPath = path.join(__dirname, '.env');
console.log('Loading .env from:', envPath);

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('.env content loaded (trimmed):');
  console.log(envContent.trim().substring(0, 200) + '...');
  
  // Parse manually
  const lines = envContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
} else {
  console.error('❌ .env file not found at', envPath);
  process.exit(1);
}

// Step 2: Verify API key
console.log('\nChecking API key:');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
  console.log('Key length:', process.env.GEMINI_API_KEY.length);
  console.log('Key prefix:', process.env.GEMINI_API_KEY.substring(0, 10));
}

// Step 3: Try to make API call
async function runTest() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ No API key found!');
    process.exit(1);
  }

  try {
    console.log('\nInitializing GoogleGenerativeAI...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    console.log('Getting model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('Calling generateContent...');
    const result = await model.generateContent('Just say "Hello from Gemini!". No other text.');
    console.log('Got result!');
    
    const response = await result.response;
    const text = response.text();
    console.log('\n✅ SUCCESS! Gemini response:', text);
    
  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

runTest();
