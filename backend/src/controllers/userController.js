const bcrypt = require("bcrypt");
const User = require("../models/userModel");

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json({ status: "success", data: users });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.json({ status: "success", data: user });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
    
            console.log(req.body); // Debug log untuk memastikan data diterima
    
            // Validasi input
            if (!name || !email || !password) {
                return res.status(400).json({ status: "error", message: "Name, email, and password are required" });
            }
        
            // Simpan user ke database
            const newUser = await User.create({
                name,
                email,
                password
            });
    
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: { id: newUser.id },
            });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    

    static async updateUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Hash password jika ada
            const updatedData = {
                name,
                email,
            };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            const updated = await User.update(req.params.id, updatedData);
            if (!updated) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.json({ status: "success", message: "User updated successfully" });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const deleted = await User.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            res.json({ status: "success", message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Validasi input
            if (!email || !password) {
                return res.status(400).json({ status: "error", message: "Email and password are required" });
            }

            // Cari user berdasarkan email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ status: "error", message: "Invalid email or password" });
            }

            // Verifikasi password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ status: "error", message: "Invalid email or password" });
            }

            // Login berhasil
            res.json({
                status: "success",
                message: "Login successful",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
}

module.exports = UserController;
