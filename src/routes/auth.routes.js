import { Router } from "express";

const authRouter = Router();

import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controllers.js";

// Import validation
import {
  validateField,
  checkLoginBody,
  checkSignupBody,
} from "../middlewares/validation/validator.js";

// Register
authRouter.post("/register", checkSignupBody, validateField, createUser);

// Login
authRouter.post("/login", checkLoginBody, validateField, loginUser);

// Logout
authRouter.post("/logout", logoutUser);
// isAuth is excluded, Since a user will not be able to logout if his cookie expires

export default authRouter;
