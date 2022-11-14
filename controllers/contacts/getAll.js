const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite || !favorite;

  const contacts = await Contact.find({ owner: _id, favorite: filter }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
