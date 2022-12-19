import nodemailer from 'nodemailer';
import { welcomeEmailContent } from './config.js';

async function sendEmail(config) {
  // create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send the email
  return transporter.sendMail(config);
}

export const sendWelcomeEmail = async (email) => {
  const config = {
    from: '"DevUp" support@devup.info',
    to: email,
    subject: 'La tua candidatura è stata accettata!',
    text: welcomeEmailContent,
  };
  return sendEmail(config);
};
