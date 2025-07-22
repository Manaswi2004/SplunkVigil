const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors()); // 👈 Enables cross-origin requests
app.use(bodyParser.json());

require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeLogWithOpenAI(logText) {
  const prompt = `Analyze the following log for insider threats and explain your reasoning. Respond with a risk level (LOW, MEDIUM, HIGH) and a brief explanation.\nLog:\n${logText}`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200,
  });
  return response.choices[0].message.content;
}

const { scoreBehavior } = require('./anomalyDetector');

function parseLogForFallback(logText) {
  // Simple parser: looks for 'count' and 'bytes' in the log text
  // Example: ...count: 20...bytes: 1200...
  const countMatch = logText.match(/count:?\s*(\d+)/i);
  const bytesMatch = logText.match(/bytes:?\s*(\d+)/i);
  const count = countMatch ? parseInt(countMatch[1], 10) : 0;
  const avg_bytes = bytesMatch ? parseInt(bytesMatch[1], 10) : 0;
  return { count, avg_bytes };
}

// --- API ROUTES ---
app.post('/analyze', async (req, res) => {
  const { log } = req.body;
  if (!log || typeof log !== 'string') {
    return res.status(400).json({ result: 'Invalid log data.' });
  }
  try {
    const aiResult = await analyzeLogWithOpenAI(log);
    res.json({ result: aiResult });
  } catch (error) {
    console.error('OpenAI error:', error);
    // Improved fallback: check for 'unauthorized' first
    if (/unauthorized/i.test(log)) {
      return res.json({ result: 'HIGH RISK\nFallback: Detected unauthorized access attempt in log.' });
    }
    const { count, avg_bytes } = parseLogForFallback(log);
    const score = scoreBehavior(count, avg_bytes);
    let risk = 'LOW';
    if (score >= 0.75) risk = 'HIGH';
    else if (score >= 0.5) risk = 'MEDIUM';
    const explanation = `Fallback: Based on count=${count}, avg_bytes=${avg_bytes}, risk is ${risk}.`;
    res.json({ result: `${risk} RISK\n${explanation}` });
  }
});

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname, '../frontend/build')));

// --- FAVICON ---
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/favicon.ico'));
});

// --- CATCH-ALL: React handles all other routes ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 