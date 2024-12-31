const db = require('../config/database');

class Product {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM products');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO products (name, price, stock, image_url) VALUES (?, ?, ?, ?)',
                [data.name, data.price, data.stock, data.image_url || null]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
    

    static async update(id, data) {
        try {
            const [result] = await db.query(
                'UPDATE products SET name = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
                [data.name, data.price, data.stock, data.image_url || null, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
    

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;
