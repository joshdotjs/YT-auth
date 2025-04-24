const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/`);
});