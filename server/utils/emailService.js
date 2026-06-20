const nodemailer = require('nodemailer');

// Gmail SMTP setup
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  console.warn('SMTP credentials not set in .env - email service will not work');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

// sanitize strings for HTML emails
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Send OTP verification email
const sendVerificationEmail = async (email, name, otp) => {
  const safeName = escapeHtml(name);
  const mailOptions = {
    from: `"Lawbook" <${smtpUser}>`,
    to: email,
    subject: 'Your Verification Code - Lawbook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #1e3a8a; text-align: center;">Lawbook - Email Verification</h2>
        <p style="color: #475569;">Hi ${safeName},</p>
        <p style="color: #475569;">Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
        
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #1e3a8a; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>

        <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes.</p>
        <p style="color: #64748b; font-size: 14px; margin-top: 20px;">If you didn't create an account, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail
};
