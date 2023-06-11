import configResponse from "../config.js";
// import { sendRes } from "../helpers/sendRes.helper.js";
import ErrorHandler from "../helpers/error.helper.js";
import {
  comparePassword,
  encryptPassword,
} from "../helpers/password.helper.js";
import sendJWT from "../helpers/sendJwt.helper.js";
import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  // Well, the fields are already validated
  // So, We are sure that the data which came is correct

  // Get fields from body
  const { username, email, password } = req.body;

  try {
    // findOne({ username })
    let userDB = await User.findOne({ username });

    // if found => res.send(false,409, "The useran... another")
    if (userDB)
      return next(new ErrorHandler(configResponse.messages.ALREADY_EXIST, 409));

    // Hash the password
    const hash = await encryptPassword(password);

    // create(user)
    userDB = await User.create({ username, email, password: hash });

    // Delete the password field from the userDB object
    delete userDB.password;

    return sendJWT(
      res,
      201,
      configResponse.messages.REGISTRATION_SUCCESSFULLY,
      userDB
    );
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  // if this function is running, then => VALIDATION === Success

  // Get the fields
  const { username, password } = req.body;
  try {
    // find user with same username
    const userDB = await User.findOne({ username });

    // if not found
    if (!userDB)
      return next(
        new ErrorHandler(configResponse.messages.USER_NOT_EXIST, 404)
      );

    // if found => match password
    const isPassValid = await comparePassword(password, userDB.password);

    // if not match => send(401)
    if (!isPassValid)
      return next(
        new ErrorHandler(configResponse.messages.WRONG_PASSWORD, 401)
      );

    // Delete the password field from the userDB object
    delete userDB.password;

    // send user
    return sendJWT(
      res,
      200,
      configResponse.messages.LOGIN_SUCCESSFULLY,
      userDB
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("auth_token", "", { expires: new Date(Date.now()) })
    .json({ success: true, msg: configResponse.messages.LOGOUT_SUCCESSFULLY });
};
