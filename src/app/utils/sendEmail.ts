import nodemailer from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: true,
    auth: {
      user: "abusayedstudent855@gmail.com",
      pass: "nhlk qvtv prgl ttkc",
    },
  });
  await transporter.sendMail({
    from: '"abusayedstudent855@gmail.com',
    to,
    subject: "Reset your password withín 10 minute ✔",
    text: "Reset your password withín 10 minute ?",
    html,
  });
};
