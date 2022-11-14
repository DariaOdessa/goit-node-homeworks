const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteStatusJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", auth, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.patch(
  "/:id/favorite",
  auth,
  validation(favoriteStatusJoiSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
