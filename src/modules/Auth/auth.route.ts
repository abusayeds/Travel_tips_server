import { Router } from "express";
import { AuthValidation } from "./auth-validation";
import requestValidation from "../../app/middlwares/validation-request";
import { authController } from "./auth-controller";

const router = Router();

router.post(
  "/forget-password",
  requestValidation(AuthValidation.forgetPasswordValidationSchema),
  authController.forgetPassword
);
router.post(
  "/reset-password",
  requestValidation(AuthValidation.resetPasswordValidationSchema),
  authController.resetPassword
);
router.post(
  "/change-password",
  requestValidation(AuthValidation.changePasswordValidationSchema),
  authController.changePassword
);

export const authRoutes = router;
