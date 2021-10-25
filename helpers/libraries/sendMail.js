const nodemailer = require("nodemailer");
const sendEmail = async (mailOptions) => {
  let tranporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      //email
      //password
    },
  });
  let info = await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
