const express = require('express');
const app = express();
let users = [
  { id: 1, nom: 'Alice' },
  { id: 2, nom: 'Bob' },
];

// GET all users
app.get('/', (req, res) => {
  res.send("welcome to home");
});

// GET one user
app.get('/users', (req, res) => {
  if (users.length==0){
    res.status(404),send('no users found')
    return 
  }
  res.status(200).send(users)
});

// POST new user
app.post('/create', (req, res) => {
  const { nom } = req.body;
  const newUser = { id: users.length + 1, nom };
  users.push(newUser);
  res.status(201).json(newUser);
});
