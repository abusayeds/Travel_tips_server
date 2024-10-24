import { Router } from "express";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../User/user-constant";


import { flowcontroller } from "./flow-controller";



const router = Router();

router.post(
  "/create-flow",
  auth(USER_ROLE.USER || USER_ROLE.ADMIN),
//   requestValidation(flowValidation.crateFlowValidation),
  flowcontroller.createFlow
);
router.post(
  "/un-flow",
  auth(USER_ROLE.USER || USER_ROLE.ADMIN),
//   requestValidation(flowValidation.crateFlowValidation),
  flowcontroller.unFlow
);

export const flowRouts = router;
