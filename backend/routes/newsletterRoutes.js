const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { email } = req.body;
  console.log('Attempting to send email to:', email);


  try {
    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Subscription Confirmed',
      text: 'Thanks for subscribing to CHLOTHZY!',
      html: '<h1>Welcome to CHLOTHZY</h1><p>Thank you for subscribing!</p>',
    });

    res.status(200).json({ message: 'Verification email resent. Please check your inbox.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
