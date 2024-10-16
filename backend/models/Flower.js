const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: String,
   image: String,  // URL of the flower image
   stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Flower', flowerSchema);
