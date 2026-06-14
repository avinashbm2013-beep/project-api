const express = require('express');
const axios = require('axios');
const app = express();

// Use dynamic PORT from environment or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// External API endpoints for jokes
const JOKE_APIS = {
  random: 'https://v2.jokeapi.dev/joke/Any',
  programming: 'https://v2.jokeapi.dev/joke/Programming',
  knock_knock: 'https://v2.jokeapi.dev/joke/Knock-Knock',
  general: 'https://v2.jokeapi.dev/joke/General'
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Joke API!',
    endpoints: {
      random: '/api/joke',
      programming: '/api/joke/programming',
      knockKnock: '/api/joke/knock-knock',
      general: '/api/joke/general',
      multiple: '/api/joke/multiple/:count',
      health: '/health'
    }
  });
});

// GET random joke from default API
app.get('/api/joke', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.random);
    const joke = response.data;
    
    let jokeText;
    if (joke.type === 'single') {
      jokeText = joke.joke;
    } else {
      jokeText = `${joke.setup} ${joke.delivery}`;
    }
    
    res.json({
      success: true,
      joke: jokeText,
      setup: joke.setup || 'N/A',
      punchline: joke.delivery || joke.joke,
      type: 'general',
      category: joke.category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// GET programming joke
app.get('/api/joke/programming', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.programming);
    const joke = response.data;
    
    let jokeText;
    if (joke.type === 'single') {
      jokeText = joke.joke;
    } else {
      jokeText = `${joke.setup} ${joke.delivery}`;
    }
    
    res.json({
      success: true,
      joke: jokeText,
      setup: joke.setup || 'N/A',
      punchline: joke.delivery || joke.joke,
      type: 'programming',
      category: joke.category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch programming joke',
      error: error.message
    });
  }
});

// GET knock-knock joke
app.get('/api/joke/knock-knock', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.knock_knock);
    const joke = response.data;
    
    let jokeText;
    if (joke.type === 'single') {
      jokeText = joke.joke;
    } else {
      jokeText = `${joke.setup} ${joke.delivery}`;
    }
    
    res.json({
      success: true,
      joke: jokeText,
      setup: joke.setup || 'N/A',
      punchline: joke.delivery || joke.joke,
      type: 'knock-knock',
      category: joke.category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch knock-knock joke',
      error: error.message
    });
  }
});

// GET general joke
app.get('/api/joke/general', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.general);
    const joke = response.data;
    
    let jokeText;
    if (joke.type === 'single') {
      jokeText = joke.joke;
    } else {
      jokeText = `${joke.setup} ${joke.delivery}`;
    }
    
    res.json({
      success: true,
      joke: jokeText,
      setup: joke.setup || 'N/A',
      punchline: joke.delivery || joke.joke,
      type: 'general',
      category: joke.category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch general joke',
      error: error.message
    });
  }
});

// GET multiple random jokes
app.get('/api/joke/multiple/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 1, 10); // Max 10 jokes
    const jokes = [];

    for (let i = 0; i < count; i++) {
      const response = await axios.get(JOKE_APIS.random);
      const joke = response.data;
      
      let jokeText;
      if (joke.type === 'single') {
        jokeText = joke.joke;
      } else {
        jokeText = `${joke.setup} ${joke.delivery}`;
      }
      
      jokes.push({
        joke: jokeText,
        setup: joke.setup || 'N/A',
        punchline: joke.delivery || joke.joke,
        category: joke.category
      });
    }

    res.json({
      success: true,
      count: jokes.length,
      jokes: jokes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jokes',
      error: error.message
    });
  }
});

// GET joke by category (general, programming, knock-knock)
app.get('/api/joke/:category', async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    let apiUrl;

    if (category === 'programming') {
      apiUrl = JOKE_APIS.programming;
    } else if (category === 'knock-knock') {
      apiUrl = JOKE_APIS.knock_knock;
    } else if (category === 'random') {
      apiUrl = JOKE_APIS.random;
    } else if (category === 'general') {
      apiUrl = JOKE_APIS.general;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Use: random, general, programming, or knock-knock'
      });
    }

    const response = await axios.get(apiUrl);
    const joke = response.data;
    
    let jokeText;
    if (joke.type === 'single') {
      jokeText = joke.joke;
    } else {
      jokeText = `${joke.setup} ${joke.delivery}`;
    }

    res.json({
      success: true,
      joke: jokeText,
      setup: joke.setup || 'N/A',
      punchline: joke.delivery || joke.joke,
      category: category,
      jokeCategory: joke.category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Joke API is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      '/',
      '/api/joke',
      '/api/joke/programming',
      '/api/joke/knock-knock',
      '/api/joke/general',
      '/api/joke/multiple/:count',
      '/health'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎭 Joke API running on port ${PORT}`);
  console.log(`📍 Base URL: http://localhost:${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   GET http://localhost:${PORT}/api/joke`);
  console.log(`   GET http://localhost:${PORT}/api/joke/programming`);
  console.log(`   GET http://localhost:${PORT}/api/joke/knock-knock`);
  console.log(`   GET http://localhost:${PORT}/api/joke/general`);
  console.log(`   GET http://localhost:${PORT}/api/joke/multiple/:count`);
  console.log(`   GET http://localhost:${PORT}/health`);
});

module.exports = app;
