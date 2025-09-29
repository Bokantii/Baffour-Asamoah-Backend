const { Resend } = require('resend');
const dotenv = require('dotenv');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
exports.sendContactMessage = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'New Lead!!!😍😍<onboarding@resend.dev>',  
      to: 'jtemenu@gmail.com',                          
      subject: `New message from ${firstName} ${lastName}`,
      html: `
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully', response });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};
