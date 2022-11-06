const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found!`);
  }
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
