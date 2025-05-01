const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Your mock data goes here' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));