const Subscriber = require("../models/Subscriber");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.isVerified) {
        return res.status(200).json({
          success: true,
          message: "This email is already subscribed.",
        });
      }

      await sendVerificationEmail(existingSubscriber);
      return res.status(200).json({
        success: true,
        message: "Verification email resent. Please check your inbox.",
      });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    const subscriber = new Subscriber({
      email,
      verificationToken,
      verificationTokenExpires,
    });

    await subscriber.save();
    await sendVerificationEmail(subscriber);

    res.status(200).json({
      success: true,
      message: "Thank you for subscribing! Please check your email to confirm.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

async function sendVerificationEmail(subscriber) {
  const verificationUrl = `${process.env.BASE_URL}/api/newsletter/verify?token=${subscriber.verificationToken}`;

  const mailOptions = {
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
    to: subscriber.email,
    subject: "Application for Full Stack Developer Position",
    html:`
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
    <h2 style="color: #000;">Please checkout my Resume!</h2>
    
    <p style="color: #000;">
      Dear Hiring Manager,<br><br>

      I hope this message finds you well.<br><br>

      My name is <strong>Rajkumar Yogi</strong>, and I am writing to express my interest in the Full Stack Developer position at your esteemed organization. I recently completed my B.Tech in Computer Science Engineering from Jawaharlal Nehru University (JNU), and I bring hands-on experience in full-cycle development with the MERN stack, AWS deployment, and scalable architecture design.<br><br>

      In my role as Head of IT and Services at Dharti International Foundation, I led the end-to-end development of a full-stack web platform. This included an admin panel, secure user authentication, payment gateway integration, a newsletter system, and social media connectivity — all built using Node.js, Express.js, MongoDB, and EJS.<br><br>

      Additionally, I developed a fully functional e-commerce site during a five-day coding bootcamp and architected a scalable, modular NGO website framework that allows rapid deployment across organizations.<br><br>

      <strong>My strengths include:</strong><br>
      - Project ownership from ideation to deployment<br>
      - Deep understanding of RESTful APIs and middleware-based access control (JWT)<br>
      - Leadership experience as the Battalion Headquarters Major in NCC JNU, where I managed multi-college events with 450+ participants<br><br>

      I have included my portfolio and resume for your review:<br><br>

      🌐 <strong>Portfolio:</strong> <a href="https://yogi-rajkumar.vercel.app" target="_blank" style="color: #0000EE;">yogi-rajkumar.vercel.app</a><br>
      📄 <strong>Resume:</strong> <a href="https://docs.google.com/document/d/1y89-dms9A_yrdGTGdYxlhec5QoLTcgZS5zvrDhIDQ9s/edit?usp=sharing" target="_blank" style="color: #0000EE;">Resume Rajkumar Yogi</a><br>
      💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/rajkumaryogi-jnu" target="_blank" style="color: #0000EE;">linkedin.com/in/rajkumaryogi-jnu</a><br>
      🛠️ <strong>GitHub:</strong> <a href="https://github.com/Rajkumaryogi" target="_blank" style="color: #0000EE;">github.com/Rajkumaryogi</a><br><br>

      I would welcome the opportunity to further discuss how my skills and experience align with your team’s goals. Thank you for your time and consideration.<br><br>

      Warm regards,<br>
      Rajkumar Yogi<br>
      📞 +91 9785641782<br>
      ✉️ work.yogirajkumar@gmail.com
    </p>

    <p style="margin-top: 30px; color: #000;">
      <small>Best regards, Rajkumar Yogi - 9785641782</small>
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
      verificationTokenExpires: { $gt: Date.now() },
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
    console.error("Verification error:", error);
    res.status(500).send(`
            <h1>Error</h1>
            <p>There was an error verifying your email.</p>
        `);
  }
};
