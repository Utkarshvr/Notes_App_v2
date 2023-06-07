import { body, validationResult } from "express-validator";
import { sendRes } from "../../helpers/sendRes.helper.js";

// Validating The Sent Request Body
export const checkSignupBody = [
  body("username", "Enter a valid username")
    .notEmpty()
    .withMessage("Field must not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Field must have a minimum length of 3 characters")
    .matches(/^[^A-Z]*$/)
    .withMessage("Field must be in lowercase")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Field must not contain empty spaces");
      }
      return true;
    }),
  body("email", "Enter A Valid Email").isEmail(),
  body("password", "Password Must Be At Least 5 Characters").isLength({
    min: 5,
  }),
];

export const checkLoginBody = [
  body("email", "Enter A Valid Email").isEmail(),
  body("password", "Password Cannot Be Blank").exists(),
];

export const checkNotes = [
  body("title", "Title Must Be At Least 3 Characters").isLength({ min: 3 }),
  body("desc", "Description Must Be At Least 5 Characters").isLength({
    min: 5,
  }),
];

export const validateField = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If erros return Bad Request with the errors
      return sendRes(res, 400, false, "Field was incorrect", null, errors);
    }
    next();
  } catch (error) {
    return sendRes(res, 500, false, "Internal error occured");
  }
};
