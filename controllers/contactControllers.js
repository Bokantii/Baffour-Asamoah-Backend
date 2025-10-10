// const { Resend } = require('resend');
// const dotenv = require('dotenv');
// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);
// exports.sendContactMessage = async (req, res) => {
//   const { firstName, lastName, email, message } = req.body;

//   try {
//     const response = await resend.emails.send({
//       from: 'New Lead!!!😍😍<onboarding@resend.dev>',  
//       to: process.env.CONTACT_RECEIVER,                          
//       subject: `New message from ${firstName} ${lastName}`,
//       html: `
//         <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     });
      

//     res.status(200).json({ message: 'Message sent successfully', response });
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//     res.status(500).json({ message: 'Failed to send email', error: error.message });
//   }
// };


const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// 1️⃣ Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Works best with Gmail App Password
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2️⃣ Define the sendContactMessage function
exports.sendContactMessage = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New message from ${firstName} ${lastName}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "✅ Email sent successfully!" });
    console.log("📧 Using Nodemailer to send email...");

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({ message: "❌ Failed to send email", error: error.message });
  }
};
