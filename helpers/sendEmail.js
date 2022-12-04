const sgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "dariaonlynew@gmail.com" };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgEmail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
