const connection = require('../config/db'); // your MySQL connection

// Get all pizza orders
exports.getAllOrders = (req, res) => {
    connection.query('SELECT * FROM pizza_orders', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Get pizza order by ID
exports.getOrderById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM pizza_orders WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: 'Order not found' });
    });
};

// Create new pizza order
exports.createOrder = (req, res) => {
    const { customer_name, pizza_type, size, quantity, status } = req.body;
    connection.query(
        'INSERT INTO pizza_orders (customer_name, pizza_type, size, quantity, status) VALUES (?, ?, ?, ?, ?)',
        [customer_name, pizza_type, size, quantity, status],
        (err, result) => {
            if (err) throw err;
            res.status(201).json({ message: 'Order created', orderId: result.insertId });
        }
    );
};

// Update pizza order
exports.updateOrder = (req, res) => {
    const id = req.params.id;
    const { customer_name, pizza_type, size, quantity, status } = req.body;
    connection.query(
        'UPDATE pizza_orders SET customer_name=?, pizza_type=?, size=?, quantity=?, status=? WHERE id=?',
        [customer_name, pizza_type, size, quantity, status, id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) res.json({ message: 'Order updated' });
            else res.status(404).json({ message: 'Order not found' });
        }
    );
};

// Delete pizza order
exports.deleteOrder = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM pizza_orders WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) res.json({ message: 'Order deleted' });
        else res.status(404).json({ message: 'Order not found' });
    });
};
