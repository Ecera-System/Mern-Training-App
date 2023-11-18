// controllers/authController.js
const User = require('../models/User');
const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate and save a reset token to the user's document in the database
    const resetToken = generateResetToken(); // Implement your own token generation function
    user.resetToken = resetToken;
    await user.save();

    // Send reset email with a link containing the resetToken
    sendResetEmail(email, resetToken); // Implement your own email sending function

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendPasswordResetEmail,
};
