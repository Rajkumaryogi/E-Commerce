const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        
        if (existingSubscriber) {
            if (existingSubscriber.isVerified) {
                return res.status(400).json({ 
                    error: 'This email is already subscribed.' 
                });
            }
            // Resend verification if not verified
            await sendVerificationEmail(existingSubscriber);
            return res.json({ 
                message: 'Verification email resent. Please check your inbox.' 
            });
        }
        
        // Create new subscriber
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        const subscriber = new Subscriber({
            email,
            verificationToken,
            verificationTokenExpires
        });
        
        await subscriber.save();
        await sendVerificationEmail(subscriber);
        
        res.json({ 
            message: 'Thank you for subscribing! Please check your email to confirm.' 
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ 
            error: 'An error occurred. Please try again later.' 
        });
    }
};

async function sendVerificationEmail(subscriber) {
    // const verificationUrl = `${process.env.BASE_URL}/verify-subscription?token=${subscriber.verificationToken}`;
    
    const mailOptions = {
        from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
        to: subscriber.email,
        subject: 'Confirm Your Newsletter Subscription',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5983e8;">Thanks for subscribing!</h2>
                <p>If you didn't request this, please ignore this email.</p>
                <p style="margin-top: 30px; color: #777;">
                    <small>Best regards Rajkumar Yogi-CHLOTHZY </small>
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
}