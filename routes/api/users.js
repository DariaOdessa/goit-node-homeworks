const express = require("express");

const {
  joiSignupSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/subscription",
  auth,
  validation(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
