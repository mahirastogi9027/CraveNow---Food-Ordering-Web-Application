const fs = require('fs');
const path = require('path');
const https = require('https');

// Step 1: Read and parse .env manually
const envPath = path.join(__dirname, '.env');
console.log('=== Direct Gemini API Test ===');
console.log('1. Reading .env file from:', envPath);

let apiKey = null;
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('   .env file content:');
  console.log('   --------------------');
  console.log(content);
  console.log('   --------------------');
  
  const lines = content.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
      if (key.trim() === 'GEMINI_API_KEY') {
        apiKey = value;
      }
    }
  });
} else {
  console.error('   ❌ .env file not found!');
  process.exit(1);
}

console.log('\n2. Checking GEMINI_API_KEY:');
console.log('   Exists:', !!apiKey);
if (apiKey) {
  console.log('   Key length:', apiKey.length);
  console.log('   First 10 chars:', apiKey.substring(0, 10) + '...');
}

// Step 3: Make direct HTTPS request to Gemini API
console.log('\n3. Making direct HTTPS request to Gemini API...');
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
const data = JSON.stringify({
  contents: [{
    parts: [{
      text: 'Say hello from direct Gemini API test'
    }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  port: 443,
  path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  console.log('   Response status code:', res.statusCode);
  console.log('   Response headers:', res.headers);

  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    console.log('\n4. Full response body:');
    console.log('   --------------------');
    console.log(responseBody);
    console.log('   --------------------');
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('\n✅ Request SUCCESSFUL!');
    } else {
      console.error('\n❌ Request FAILED!');
      try {
        const parsed = JSON.parse(responseBody);
        console.error('   Error details:', JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.error('   Could not parse JSON response');
      }
    }
  });
});

req.on('error', (error) => {
  console.error('   Request error:', error.message);
});

req.write(data);
req.end();
