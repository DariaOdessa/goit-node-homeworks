const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const { User } = require("../../models");

const verifyEmailResend = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("User not found");
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<link rel="shortcut icon" href="#" /> <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = verifyEmailResend;
