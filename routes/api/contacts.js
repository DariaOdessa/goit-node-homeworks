const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteStatusJoiSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.patch(
  "/:id/favorite",
  validation(favoriteStatusJoiSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
