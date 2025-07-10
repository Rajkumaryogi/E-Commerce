const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
        
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        
        if (existingSubscriber) {
            if (existingSubscriber.isVerified) {
                return res.status(200).json({ 
                    success: true,
                    message: 'This email is already subscribed.'
                });
            }
            
            await sendVerificationEmail(existingSubscriber);
            return res.status(200).json({ 
                success: true,
                message: 'Verification email resent. Please check your inbox.'
            });
        }
        
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
        
        const subscriber = new Subscriber({
            email,
            verificationToken,
            verificationTokenExpires
        });
        
        await subscriber.save();
        await sendVerificationEmail(subscriber);
        
        res.status(200).json({ 
            success: true,
            message: 'Thank you for subscribing! Please check your email to confirm.'
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred. Please try again later.'
        });
    }
};

async function sendVerificationEmail(subscriber) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-subscription?token=${subscriber.verificationToken}`;
    
    const mailOptions = {
        from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
        to: subscriber.email,
        subject: 'Confirm Your Newsletter Subscription',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5983e8;">Thanks for subscribing!</h2>
                <p>Please click <a href="${verificationUrl}">here</a> to confirm your subscription.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p style="margin-top: 30px; color: #777;">
                    <small>Best regards Rajkumar Yogi-CHLOTHZY </small>
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
}

exports.verify = async (req, res) => {
    try {
        const { token } = req.query;
        
        const subscriber = await Subscriber.findOne({ 
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });
        
        if (!subscriber) {
            return res.status(400).send(`
                <h1>Verification Failed</h1>
                <p>Invalid or expired verification token.</p>
            `);
        }
        
        subscriber.isVerified = true;
        subscriber.verificationToken = undefined;
        subscriber.verificationTokenExpires = undefined;
        await subscriber.save();
        
        res.send(`
            <h1>Email Verified</h1>
            <p>Thank you for subscribing to our newsletter!</p>
            <script>
                setTimeout(() => {
                    window.location.href = '${process.env.CLIENT_URL}';
                }, 3000);
            </script>
        `);
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).send(`
            <h1>Error</h1>
            <p>There was an error verifying your email.</p>
        `);
    }
};