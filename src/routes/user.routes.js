import { Router } from "express";

const userRouter = Router();

import {
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controllers.js";

import isAuthenticated from "../middlewares/authentication/isAuthenticated.js";

// Better Syntax
// userRouter.all("/", isAuthenticated).get(getUser).put(updateUser).delete(deleteUser)

// Get User
userRouter.get("/", isAuthenticated, getUser);

// Delete User
userRouter.delete("/", isAuthenticated, deleteUser);

// Update User
userRouter.put("/", isAuthenticated, updateUser);

export default userRouter;
