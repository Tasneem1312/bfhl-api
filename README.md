A small Express REST API that accepts a POST request at /bfhl with a JSON body containing a data array. The API classifies input tokens into numbers, alphabets, and special characters, returns even/odd numbers (as strings), uppercased alphabet tokens, special characters, sum of numeric tokens (as a string), and a concatenated reversed/alternating-caps string built from all alphabet characters.
Endpoint

POST /bfhl

Content-Type: application/json

Request body:
{
  "data": ["a","1","334","4","R","$"]
}
Successful response: HTTP 200 with JSON containing:

is_success (boolean)

status (string)

user_id (string) — format: {full_name_ddmmyyyy} (lowercase, spaces → underscores)

email (string)

roll_number (string)

odd_numbers (array of strings)

even_numbers (array of strings)

alphabets (array of uppercased tokens)

special_characters (array)

sum (string)

concat_string (string)

Environment variables
Set these in a .env file for local development (do not commit .env to Git):
FULL_NAME="John Doe"
DOB="17091999"            # ddmmyyyy format
EMAIL="john@xyz.com"
ROLL_NUMBER="ABCD123"
PORT=3000
user_id is derived as: full_name (lowercase, spaces -> underscores) + _ + DOB.
Example: FULL_NAME="John Doe", DOB="17091999" → user_id: "john_doe_17091999"

Run locally
1. Install dependencies:
   npm install
2. Start server:
   npm start
  For development (auto-reload) if you installed nodemon:
  npm run dev
Server default: http://localhost:3000 (or the PORT in .env)
Example requests & expected responses
Example A
Request:
{"data":["a","1","334","4","R","$"]}
Expected response:
{
  "is_success": true,
  "status": "success",
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
Example B
Request:
{"data":["2","a","y","4","&","-","*","5","92","b"]}
Expected response:
{
  "is_success": true,
  "status": "success",
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A","Y","B"],
  "special_characters": ["&","-","*"],
  "sum": "103",
  "concat_string": "ByA"
}

Example C
Request:
{"data":["A","ABcD","DOE"]}
{
  "is_success": true,
  "status": "success",
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A","ABCD","DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
