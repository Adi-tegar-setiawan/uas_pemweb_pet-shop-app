const db = require('../config/database');

class Cart {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM cart');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(userId) {
        try {
            const [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [data.user_id, data.product_id, data.quantity]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const [result] = await db.query(
                'UPDATE cart SET quantity = ? WHERE id = ?',
                [data.quantity, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM cart WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cart;
