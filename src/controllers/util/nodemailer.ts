import nodemailer from 'nodemailer';


// Create the transporter object (reusable in multiple functions)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Example for Gmail SMTP
    port: 587,  // Or use 465 for SSL
    secure: false,  // Set to true if using port 465
    auth: {
      user: process.env.EMAIL,  // Your email address
      pass: process.env.EMAIL_PASS,  // Your email password or App password
    },
  });

  export const sendEmail = async (to: string,  otp:string,user:string) => {
    const info = await transporter.sendMail({
      from:'EASY SHOP',
      to,
      subject:'VERIFY OTP CODE',
      html:` <!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Email</title>
      <link href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
          <td style="padding: 0;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background-color: #4A90E2; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Welcome to EASY SHOP</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 24px; line-height: 1.6;">
                  <p style="margin-top: 0; color: #333333; font-size: 16px;">Hello 👋 ${user},</p>
                  
                  <p style="color: #333333; font-size: 16px;">Thank you for signing up! We're excited to have you on board.</p>
                  
                  <p style="color: #333333; font-size: 16px;">Here are verification code  to help you get started this code expired in 15 minutes:</p>
                  
              
                  
                  <div style="margin: 30px 0; text-align: center;">
                  <h1 style="background-color: #4A90E2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">${otp}</h1>
                  </div>
                  
                  <p style="color: #333333; font-size: 16px;">If you have any questions, just reply to this email. We're always here to help!</p>
                  
                  <p style="color: #333333; font-size: 16px;">Best regards,<br>Merci RUYANGA</p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f4f4f4; padding: 24px; text-align: center;">
                  <p style="margin: 0; color: #777777; font-size: 14px;">
                  © 2025 EASY SHOP. All rights reserved.
                  </p>
                  <p style="margin: 10px 0 0; color: #777777; font-size: 14px;">
                  <a href="#" style="color: #777777; text-decoration: underline;">Unsubscribe</a> |
                  <a href="#" style="color: #777777; text-decoration: underline;">Privacy Policy</a>
                  </p>
                  <div style="margin-top: 20px;">
                  <a href="https://www.facebook.com/ruyanga.merci.1" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                  
                      <i class="bi bi-facebook"></i>
                  </a>
                  <a href="https://x.com/RuyangaM" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                      <i class="bi bi-twitter-x"></i>
                  </a>
                  <a href="https://github.com/RUYANGA" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                      <i class="bi bi-github"></i>
                  </a>
                  </div>
              </div>
              </div>
          </td>
          </tr>
      </table>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>`
    });
  };