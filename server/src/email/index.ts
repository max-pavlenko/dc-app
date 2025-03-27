import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
   }
});

export const sendEmail = async (options: Mail.Options) => {
   const mailOptions = {
      from: process.env.EMAIL_USER,
      ...options
   };
   
   return transporter.sendMail(mailOptions);
}
