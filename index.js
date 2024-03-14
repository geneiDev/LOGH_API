// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' }
  ];
  res.json(users);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});