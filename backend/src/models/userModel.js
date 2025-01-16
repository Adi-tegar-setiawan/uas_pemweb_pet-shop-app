const db = require('../config/database');

class User {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [data.name, data.email, data.password]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
    

    static async update(id, data) {
        try {
            const [result] = await db.query(
                'UPDATE users SET name = ?, password = ?, email = ? WHERE id = ?',
                [data.name, data.password, data.email, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findByName(name) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE name = ?", [name]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = User;
