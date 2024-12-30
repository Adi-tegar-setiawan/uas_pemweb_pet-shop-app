const User = require('../models/userModel');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json({ status: 'success', data: users });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
            res.json({ status: 'success', data: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { name, password, email } = req.body;
            if (!name || !password || !email) {
                return res.status(400).json({ status: 'error', message: 'Please provide username, password, and email' });
            }
            const userId = await User.create({ name, password, email });
            res.status(201).json({ status: 'success', message: 'User created successfully', data: { id: userId } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { name, password, email } = req.body;
            const updated = await User.update(req.params.id, { name, password, email });
            if (!updated) return res.status(404).json({ status: 'error', message: 'User not found' });
            res.json({ status: 'success', message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const deleted = await User.delete(req.params.id);
            if (!deleted) return res.status(404).json({ status: 'error', message: 'User not found' });
            res.json({ status: 'success', message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = UserController;
