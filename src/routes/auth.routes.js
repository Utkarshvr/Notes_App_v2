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

import isAuthenticated from "../middlewares/authentication/isAuthenticated.js";

// Register
authRouter.post("/register", checkSignupBody, validateField, createUser);

// Login
authRouter.post("/login", checkLoginBody, validateField, loginUser);

// Logout
authRouter.get("/logout", isAuthenticated, logoutUser); // isAuth included, Since a user should be able to logout only when its still login

export default authRouter;
