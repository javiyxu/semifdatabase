// pizzaRoutes.js
const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Get all orders
router.get('/orders', pizzaController.getAllOrders);

// Get order by ID
router.get('/orders/:id', pizzaController.getOrderById);

// Create new order
router.post('/orders', pizzaController.createOrder);

// Update an order
router.put('/orders', pizzaController.updateOrder);

// Delete an order
router.delete('/orders', pizzaController.deleteOrder);

module.exports = router;