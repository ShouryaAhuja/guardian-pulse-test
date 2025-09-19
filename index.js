const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3001;

// --- Middleware ---
// 1. Enable CORS for all routes
app.use(cors());

// 2. Allow the server to parse JSON in request bodies
app.use(express.json());

// 3. Serve static files (like index.html, css, etc.) from the main directory
app.use(express.static(__dirname));


// --- Routes ---
// 1. Serve the homepage when a user visits the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Your API endpoint to check a website's status
app.post('/check-url', async (req, res) => {
  const websiteUrl = req.body.url;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Please provide a URL.' });
  }

  try {
    // We use a HEAD request for efficiency as it just gets headers, not the full body.
    const response = await fetch(websiteUrl, { method: 'HEAD' });
    res.json({
      url: websiteUrl,
      status: 'UP',
      statusCode: response.status,
      message: 'The website is reachable.'
    });
  } catch (error) {
    res.json({
      url: websiteUrl,
      status: 'DOWN',
      error: error.message,
      message: 'The website is unreachable.'
    });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});