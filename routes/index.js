const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// GET all orders
router.get('/orders', pizzaController.getAllOrders);

// GET order by ID
router.get('/orders/:id', pizzaController.getOrderById);

// CREATE a new order
router.post('/orders', pizzaController.createOrder);

// UPDATE an order
router.put('/orders/:id', pizzaController.updateOrder);

// DELETE an order
router.delete('/orders/:id', pizzaController.deleteOrder);

module.exports = router;
