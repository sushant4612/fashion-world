const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   items: [
      {
         flowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower', required: true },
         quantity: { type: Number, required: true },
      }
   ],
   totalAmount: { type: Number, required: true },
   address: { type: String, required: true },
   phone: { type: String, required: true },
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
