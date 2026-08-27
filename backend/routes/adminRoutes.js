import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Admin routes working!' });
});

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Generate JWT token
        const token = jwt.sign(
            { role: 'admin', timestamp: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// @desc    Verify admin token
// @route   POST /api/admin/verify
// @access  Public
router.post('/verify', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'admin') {
            res.json({ valid: true });
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (error) {
        res.status(401).json({ valid: false });
    }
});

export default router;
