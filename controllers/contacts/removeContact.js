const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found!`);
  }
  res.status(200).json({
    status: "success",
    message: "contact deleted",
    data: { result },
  });
};

module.exports = removeContact;
