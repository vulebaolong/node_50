import nodemailer from "nodemailer";

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SENDER_EMAIL, //gmail sender accoount
    pass: SENDER_PASSWORD, //app password
  },
});

export default transporter;
