import nodemailer from "nodemailer";

export async function sendEmail(email, token, type) {
  const sender = process.env.SMTP_USER;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log(email);

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

  // Construct the email content
  const mailOptions = {
    from: sender,
    to: email,
    subject: `${
      type === "verify" ? "Verify your email" : "Reset your password"
    }`,
    html: `<h1>Click the link to ${
      type === "verify" ? "verify" : "reset"
    } your ${type === "verify" ? "email" : "password"}: <a href="${
      process.env.NEXTAUTH_URL
    }/${type === "verify" ? "verify" : "fp/reset"}?token=${token}">${
      process.env.NEXTAUTH_URL
    }/${type === "verify" ? "verify" : "fp/reset"}?token=${token}</a></h1>`,
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
