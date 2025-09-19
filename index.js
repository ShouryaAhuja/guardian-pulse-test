const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/check-url', async (req, res) => {
  const websiteUrl = req.body.url;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Please provide a URL. Example: { "url": "https://google.com" }' });
  }

  try {
    const response = await fetch(websiteUrl);
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

app.listen(port, () => {
  console.log(`✅ TruthLens API server is running on port ${port}`);
  console.log(`📍 Local: http://localhost:${port}`);
});