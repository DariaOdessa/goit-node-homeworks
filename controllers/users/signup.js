const { Conflict } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<link rel="shortcut icon" href="#" /> <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
