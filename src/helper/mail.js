import nodemailer from "nodemailer";

export async function sendEmail(email, token, type) {
  const sender = process.env.SMTP_USER;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const link = `${process.env.NEXTAUTH_URL}/${type === "verify" ? "verify" : "forgot-password/reset"}?token=${token}`;

  console.log(type);
  
  // Create the transporter with the correct SMTP configuration
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true, // Use SSL for secure connection
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Create HTML content for email
  const htmlContent = `
  <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f3f4f6; padding: 20px;">
    <div style="max-width: 600px; width: 100%; background-color: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <h2 style="font-size: 24px; font-weight: 600; color: #333; text-align: center;">${type === 'verify' ? 'Verify your email' : 'Reset your password'}</h2>
      <hr style="margin: 20px 0; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 16px; color: #555; text-align: center;">
        Please click the button below to ${type === 'verify' ? 'verify your email address.' : 'reset your password.'} This link is valid for 6 hours.
      </p>
      <div style="margin-top: 24px; text-align: center;">
        <a href="${link}" style="background-color: #3b82f6; color: white; padding: 12px 24px; font-size: 16px; border-radius: 8px; text-decoration: none; display: inline-block;">${type === 'verify' ? 'Verify' : 'Reset'}</a>
      </div>
      
      <!-- Add the new div under the button -->
      <div style="margin-top: 16px;">
        <p style="font-size: 14px; color: #555; text-align: center;">
          <span>If you have any issues, visit the link below:</span>
          <br>
          <span style="font-size: 14px; color: #3b82f6;">${link}</span>
        </p>
      </div>

      <div style="margin-top: 16px;">
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          If you did not create an account with us, please ignore this email.
        </p>
      </div>
    </div>
  </div>
`;


  // Construct the email content
  const mailOptions = {
    from: sender,
    to: email,
    subject: `${type === "verify" ? "Verify your email" : "Reset your password"}`,
    html: htmlContent, // Use the manually created HTML string
  };

 
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent:", info.messageId);
    }
  });
}
