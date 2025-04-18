import nodemailer from 'nodemailer';


// Create the transporter object (reusable in multiple functions)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Example for Gmail SMTP
    port: 587,  // Or use 465 for SSL
    secure: false,  // Set to true if using port 465
    auth: {
      user: 'your-email@gmail.com',  // Your email address
      pass: 'your-email-password',  // Your email password or App password
    },
  });