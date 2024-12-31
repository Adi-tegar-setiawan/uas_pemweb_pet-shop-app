const bcrypt = require("bcrypt"); // Gunakan bcrypt untuk keamanan password
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
            const { name, password } = req.body;
    
            // Validasi input
            if (!name || !password) {
                return res.status(400).json({ status: 'error', message: 'Please provide name and password' });
            }
    
            // Hash password untuk keamanan
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Simpan user ke database
            const userId = await User.create({ name, password: hashedPassword });
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: { id: userId },
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
    

    static async updateUser(req, res) {
        try {
            const { name, password, email } = req.body;

            // Jika password diberikan, hash password baru
            const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

            const updated = await User.update(req.params.id, { name, password: hashedPassword, email });
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

    static async loginUser(req, res) {
        try {
            const { name, password } = req.body;
    
            // Validasi input
            if (!name || !password) {
                return res.status(400).json({ status: 'error', message: 'Name and password are required' });
            }
    
            // Cari user berdasarkan nama
            const user = await User.findByName(name);
            if (!user) {
                return res.status(401).json({ status: 'error', message: 'Invalid name or password' });
            }
    
            // Verifikasi password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ status: 'error', message: 'Invalid name or password' });
            }
    
            // Login berhasil
            res.json({
                status: 'success',
                message: 'Login successful',
                data: {
                    id: user.id,
                    name: user.name,
                },
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
    
}

module.exports = UserController;
