const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateUser, isCustomer, isSeller } = require('../middlewares/auth');

// User - Place an order
router.post('/', authenticateUser, isCustomer, async (req, res) => {
   const order = new Order({
      userId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      address: req.body.address,
      phone: req.body.phone
   });

   try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Admin - View all orders
router.get('/seller/orders', authenticateUser, isSeller, async (req, res) => {
   try {
      const orders = await Order.find().populate('userId').populate('items.flowerId');
      res.json(orders);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

module.exports = router;
