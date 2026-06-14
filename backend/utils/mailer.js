const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter using App Password configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection configuration failed:', error);
  } else {
    console.log('SMTP connection established successfully');
  }
});

const sendMail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Sent from the authenticated email
    to: 'aggsijs527@gmail.com', // Recipient address as required
    replyTo: email, // Reply-to visitor's email address
    subject: `Portfolio Contact - ${subject}`,
    text: `Name:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail
};
