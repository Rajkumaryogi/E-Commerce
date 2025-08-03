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
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
    <h2 style="color: #000;">Please checkout my Resume!</h2>
    
  <p style="color: #000;">
    Dear Hiring Manager,<br><br>

    I hope this message finds you well.<br><br>

    My name is <strong>Rajkumar Yogi</strong>, and I am writing to express my keen interest in the Full Stack Developer position at your esteemed organization. I recently completed my B.Tech in Computer Science and Engineering from Jawaharlal Nehru University (JNU), and I bring a strong foundation in scalable web development using the MERN stack, along with hands-on experience in AWS deployment and modern application architecture.<br><br>

    During my tenure as <strong>Head of IT and Services</strong> at Dharti International Foundation, I independently led the design and development of a full-stack web platform. This included secure user authentication (JWT), a role-based admin dashboard, Razorpay payment integration, newsletter automation, and social media campaign support — all built with <strong>Node.js, Express.js, MongoDB, and EJS</strong>.<br><br>

    I’ve also built a real-world car service management system, a modular NGO template for fast deployment, and a e-commerce platform as part of a 5-day intensive bootcamp. These projects have not only strengthened my technical expertise but also refined my ability to deliver under deadlines and collaborate effectively.<br><br>

    <strong>Key strengths I bring to the table:</strong><br>
    ✅ End-to-end project ownership — from ideation to deployment<br>
    ✅ Strong grasp of RESTful APIs and secure middleware (JWT-based auth)<br>
    ✅ Proven leadership — served as <strong>Battalion Headquarters Major (BHM)</strong> in NCC JNU, managing 450+ participants during inter-college events<br><br>

    Please find my portfolio and resume below for your reference:<br><br>

    🌐 <strong>Portfolio:</strong> <a href="https://yogi-rajkumar.vercel.app" target="_blank" style="color: #0000EE;">yogi-rajkumar.vercel.app</a><br>
    📄 <strong>Resume:</strong> <a href="https://shorturl.at/Z9cS5" target="_blank" style="color: #0000EE;">shorturl.at/Z9cS5</a><br>
    💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/rajkumaryogi-jnu" target="_blank" style="color: #0000EE;">linkedin.com/in/rajkumaryogi-jnu</a><br>
    🛠️ <strong>GitHub:</strong> <a href="https://github.com/Rajkumaryogi" target="_blank" style="color: #0000EE;">github.com/Rajkumaryogi</a><br><br>

    I would love the opportunity to further discuss how my background and skills align with your team's goals. Thank you for your time and consideration.<br><br>

    Warm regards,<br>
    <strong>Rajkumar Yogi</strong><br>
    📞 +91 9785641782<br>
    ✉️ work.yogirajkumar@gmail.com
  </p>


    <p style="margin-top: 30px; color: #000;">
      <small>Best regards, Rajkumar Yogi - 9785641782</small>
    </p>
  </div>
`,
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
