// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();


// Rutas CRUD
router.get('/users', async (req, res) => {
    const items = await User.find();
    res.json(items);
});

// Registrar usuario
router.post('/register', async (req, res) => {
  console.log('Si está ingresando : ');
  const { email, password } = req.body;
  console.log('email: ', email, ' Password: ', password)

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Email already in use' });

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error in registration' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error in login' });
  }
});

// Obtener usuario autenticado
router.get('/user', async (req, res) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

module.exports = router;
