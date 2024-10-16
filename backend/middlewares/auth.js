const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
   const token = req.header('Authorization');
   if (!token) return res.status(401).send('Access denied. No token provided.');

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      res.status(400).send('Invalid token.');
   }
};

// Role check middleware
const isCustomer = (req, res, next) => {
   if (req.user.role !== 'customer') return res.status(403).send('Access denied. Only customers allowed.');
   next();
};

const isSeller = (req, res, next) => {
   if (req.user.role !== 'seller') return res.status(403).send('Access denied. Only sellers allowed.');
   next();
};

module.exports = { authenticateUser, isCustomer, isSeller };