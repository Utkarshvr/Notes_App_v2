import { Router } from "express";
import { errorMiddleware } from "../helpers/error.helper.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import notesRouter from "./notes.routes.js";

const router = Router();

//EndPoints
router.use("/auth", authRouter);

router.use("/user", userRouter);
router.use("/notes", notesRouter);

// For error handling
router.use(errorMiddleware);

export default router;

// Use Session:
// router.use((req, res, next) => {
//     if (req.session.user) next();
//     else
//       res.status(401).json({
//         success: false,
//         msg: "Not Authorized",
//       });
//   });
