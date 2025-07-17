const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { fullName, username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ 
      message: 'Login successful', 
      user: { 
        username: user.username,
        fullName: user.fullName // Add fullName here
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { usernameOrEmail } = req.body;
  // Simulated response (no real email sending)
  if (!usernameOrEmail) {
    return res.status(400).json({ message: 'Username or email is required' });
  }
  return res.status(200).json({
    message: 'If an account exists, a reset link has been sent to your email.',
  });
};
