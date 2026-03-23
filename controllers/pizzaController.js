const connection = require('../config/db'); // your MySQL connection

// Get all users
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM userdata', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM userdata WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: 'User not found' });
    });
};

// Create new user
exports.createUser = (req, res) => {
    const { fname, lname, email, gender, ip_add } = req.body;
    connection.query(
        'INSERT INTO userdata (first_name, last_name, email, gender, ip_address) VALUES (?, ?, ?, ?, ?)',
        [fname, lname, email, gender, ip_add],
        (err, result) => {
            if (err) throw err;
            res.status(201).json({ message: 'User created', userId: result.insertId });
        }
    );
};

// Update user
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { fname, lname, email, gender, ip_add } = req.body;
    connection.query(
        'UPDATE userdata SET first_name=?, last_name=?, email=?, gender=?, ip_address=? WHERE id=?',
        [fname, lname, email, gender, ip_add, id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) res.json({ message: 'User updated' });
            else res.status(404).json({ message: 'User not found' });
        }
    );
};

// Delete user
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM userdata WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) res.json({ message: 'User deleted' });
        else res.status(404).json({ message: 'User not found' });
    });
};
