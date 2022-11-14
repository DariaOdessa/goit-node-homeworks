const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
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

module.exports = updateSubscription;
