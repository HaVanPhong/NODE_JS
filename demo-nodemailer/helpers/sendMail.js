const configuration = require("../configs/configuration");

const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: configuration.EMAIL.USERNAME,
      pass: configuration.EMAIL.PASSWORD,
    },
  });

  const message = {
    from: configuration.EMAIL.USERNAME,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  return transporter.sendMail(message);
};

module.exports = sendMail;
