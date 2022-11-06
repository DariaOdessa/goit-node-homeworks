const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`missing field favorite`);
  }
  res.status(200).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
