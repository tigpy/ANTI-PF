const mailer = require('../utils/mailer');

const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Send email using helper
    await mailer.sendMail({
      name,
      email,
      subject,
      message
    });
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = {
  sendContactEmail
};
