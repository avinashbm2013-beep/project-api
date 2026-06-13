# 🎭 Random Joke Generator API

A fun REST API that generates random jokes using the Official Joke API. Built with Express.js and Axios.

## 🚀 Features

- Get random jokes from various categories
- Support for programming jokes
- Support for knock-knock jokes
- Fetch multiple jokes at once
- Error handling and validation
- Health check endpoint

## 📦 Setup

1. Install dependencies:
```bash
npm install
```

2. Start the joke API server:
```bash
node joke-api.js
```

The server will run on `http://localhost:3001`

## 📍 API Endpoints

### 1. Get Random Joke
```
GET http://localhost:3001/api/joke
```

**Response:**
```json
{
  "success": true,
  "joke": "Why do Java developers wear glasses? Because they don't C#",
  "setup": "Why do Java developers wear glasses?",
  "punchline": "Because they don't C#",
  "type": "general"
}
```

### 2. Get Programming Joke
```
GET http://localhost:3001/api/joke/programming
```

**Response:**
```json
{
  "success": true,
  "joke": "How many programmers does it take to change a light bulb? None, that's a hardware problem",
  "setup": "How many programmers does it take to change a light bulb?",
  "punchline": "None, that's a hardware problem",
  "type": "programming"
}
```

### 3. Get Knock-Knock Joke
```
GET http://localhost:3001/api/joke/knock-knock
```

**Response:**
```json
{
  "success": true,
  "joke": "Knock knock. Who's there? Interrupting cow. Interrupting cow who? MOOOOO!",
  "setup": "Knock knock.",
  "punchline": "Who's there? Interrupting cow. Interrupting cow who? MOOOOO!",
  "type": "knock-knock"
}
```

### 4. Get Multiple Random Jokes
```
GET http://localhost:3001/api/joke/multiple/:count
```

**Example:** `GET http://localhost:3001/api/joke/multiple/3`

**Response:**
```json
{
  "success": true,
  "count": 3,
  "jokes": [
    {
      "setup": "Why do programmers prefer dark mode?",
      "punchline": "Because light attracts bugs!",
      "type": "general"
    },
    {
      "setup": "What's a programmer's favorite hangout place?",
      "punchline": "Foo Bar",
      "type": "general"
    },
    {
      "setup": "How many programmers does it take to change a light bulb?",
      "punchline": "None, that's a DevOps job",
      "type": "general"
    }
  ]
}
```

### 5. Get Joke by Category
```
GET http://localhost:3001/api/joke/:category
```

**Categories:**
- `random` - Random general joke
- `programming` - Programming joke
- `knock-knock` - Knock-knock joke

**Example:** `GET http://localhost:3001/api/joke/programming`

### 6. Health Check
```
GET http://localhost:3001/health
```

**Response:**
```json
{
  "status": "Joke API is running!"
}
```

## 🧪 Running Tests

In another terminal, run the test suite:
```bash
node joke-test.js
```

This will run comprehensive tests for all endpoints including:
- ✅ Random joke generation
- ✅ Programming joke generation
- ✅ Knock-knock joke generation
- ✅ Multiple jokes retrieval
- ✅ Category-based jokes
- ✅ Health check
- ✅ Error handling

## 🔗 External API Used

This API uses the **Official Joke API**:
- **Base URL:** https://official-joke-api.appspot.com
- **Free:** No API key required
- **Rate Limit:** Reasonable rate limiting applied

## 🛠️ Example Usage with cURL

```bash
# Get a random joke
curl http://localhost:3001/api/joke

# Get a programming joke
curl http://localhost:3001/api/joke/programming

# Get 5 random jokes
curl http://localhost:3001/api/joke/multiple/5

# Check health status
curl http://localhost:3001/health
```

## 📝 Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "joke": "Full joke string",
  "setup": "Setup part",
  "punchline": "Punchline part",
  "type": "category"
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## 🌟 Features

- **Simple Integration**: Easy-to-use REST endpoints
- **Multiple Categories**: General, programming, and knock-knock jokes
- **Batch Requests**: Get multiple jokes in one request
- **Error Handling**: Graceful error handling and messages
- **Health Check**: Monitor API status

## 📦 Dependencies

- `express` - Web framework
- `axios` - HTTP client for external API calls

## 📄 License

ISC
