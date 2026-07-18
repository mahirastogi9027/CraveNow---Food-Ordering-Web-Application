const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log("Gemini Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");

const app = express();
app.get('/', (req, res) => res.send('alive'));
app.listen(5001, () => console.log('Minimal server running on 5001'));
