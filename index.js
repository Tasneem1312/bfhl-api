require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// Config (env or defaults)
const FULL_NAME = process.env.FULL_NAME || 'john doe';
const DOB = process.env.DOB || '17091999';
const EMAIL = process.env.EMAIL || 'john@xyz.com';
const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

// Helper functions
function formatUserId(fullName, dob) {
  return String(fullName).trim().toLowerCase().replace(/\s+/g, '_') + '_' + dob;
}
function isDigitsOnly(s) { return /^[0-9]+$/.test(s); }
function isLettersOnly(s) { return /^[A-Za-z]+$/.test(s); }
function alternatingCaps(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    out += (i % 2 === 0) ? s[i].toUpperCase() : s[i].toLowerCase();
  }
  return out;
}

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Welcome to BFHL API! Use /bfhl endpoint.");
});

// ✅ GET /bfhl (for operation code)
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// ✅ POST /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !Array.isArray(payload.data)) {
      return res.status(400).json({
        is_success: false,
        status: 'bad_request',
        message: 'Request body must be JSON with a "data" array.'
      });
    }

    const data = payload.data;
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatPool = '';

    for (const tokenRaw of data) {
      const token = (typeof tokenRaw === 'string') ? tokenRaw : String(tokenRaw);
      if (isDigitsOnly(token)) {
        const n = parseInt(token, 10);
        if (n % 2 === 0) even_numbers.push(token);
        else odd_numbers.push(token);
        sum += n;
      } else if (isLettersOnly(token)) {
        alphabets.push(token.toUpperCase());
        concatPool += token;
      } else {
        special_characters.push(token);
      }
    }

    const reversedConcat = concatPool.split('').reverse().join('');
    const concat_string = alternatingCaps(reversedConcat);

    return res.status(200).json({
      is_success: true,
      status: 'success',
      user_id: formatUserId(FULL_NAME, DOB),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, status: 'error', message: 'Internal server error.' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`bfhl API listening on port ${PORT}`));
