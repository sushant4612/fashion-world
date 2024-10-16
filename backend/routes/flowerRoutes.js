const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower');
const { authenticateUser, isSeller } = require('../middlewares/auth');

router.post('/', authenticateUser, isSeller, async (req, res) => {
   const flower = new Flower({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      stock: req.body.stock
   });

   try {
      const newFlower = await flower.save();
      res.status(201).json(newFlower);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Get all flowers (User view)
router.get('/', async (req, res) => {
   try {
      const flowers = await Flower.find();
      res.json(flowers);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

module.exports = router;
