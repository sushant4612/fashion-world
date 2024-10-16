const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
   });

   try {
      const newUser = await user.save();
      res.status(201).json(newUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Login
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });
   if (!user) return res.status(400).send('Invalid email or password.');

   const validPassword = await bcrypt.compare(password, user.password);
   if (!validPassword) return res.status(400).send('Invalid email or password.');

   const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
   res.send({ token });
});

module.exports = router;
