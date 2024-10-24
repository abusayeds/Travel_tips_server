import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { UserValidation } from "./user-validation";
import { userController } from "./user-controller";
import { AuthValidation } from "../Auth/auth-validation";
import { authController } from "../Auth/auth-controller";
import { USER_ROLE } from "./user-constant";
import auth from "../../app/middlwares/auth";

const router = express.Router();
router.post(
  "/auth/signup",
  requestValidation(UserValidation.createUserValidationSchema),
  userController.createUser
);
router.post(
  "/auth/login",
  requestValidation(AuthValidation.loginValidationSchema),
  authController.createAuth
);
router.put(
  "/update-user/:userId",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  requestValidation(UserValidation.updateUserValidationSchema),
  userController.updateUser
);
router.get(
  "/single-user/:userId",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  userController.getSingleUser
);
router.delete(
  "/delete-user/:userId",
  auth(USER_ROLE.ADMIN),
  userController.deleteUser
);
router.get("/single-email-user/:email", userController.getSingleEmailUser);
router.get("/all-user", auth(USER_ROLE.ADMIN), userController.getAllUser);

export const userRoutes = router;
