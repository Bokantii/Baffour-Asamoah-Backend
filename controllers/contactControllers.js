const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactMessage = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Validate environment variables
  const envVars = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_RECEIVER: process.env.CONTACT_RECEIVER,
  };

  for (const [key, value] of Object.entries(envVars)) {
    if (!value) {
      return res.status(500).json({ message: `Server error: Missing ${key}` });
    }
  }

  // Validate request body
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      message: "Missing required fields: firstName, lastName, email, message",
    });
  }

  // Validate email formats
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: `Invalid email format: ${email}` });
  }
  if (!isValidEmail(process.env.CONTACT_RECEIVER)) {
    return res.status(400).json({
      message: `Invalid recipient email: ${process.env.CONTACT_RECEIVER}`,
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "New Lead!! <contact@asamoahassociates.com>",
      to: [process.env.CONTACT_RECEIVER],
      subject: `New message from ${firstName} ${lastName}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <small>This email was sent via Resend from your Render dev backend.</small>
      `,
    });

    if (error) {
      if (error.statusCode === 403) {
        return res.status(403).json({
          message:
            "API authentication failed (403). Check RESEND_API_KEY permissions.",
          error: error.message,
        });
      }
      if (error.statusCode === 422) {
        return res.status(422).json({
          message: "Invalid email parameters. Check 'from' or 'to' fields.",
          error: error.message,
        });
      }
      return res.status(500).json({
        message: "Failed to send email",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Message sent successfully!",
      emailId: data.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send email due to an unexpected error",
      error: error.message,
    });
  }
};
