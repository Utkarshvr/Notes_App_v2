import configResponse from "../config.js";
import ErrorHandler from "../helpers/error.helper.js";
import { encryptPassword } from "../helpers/password.helper.js";
import sendJWT from "../helpers/sendJwt.helper.js";
import { sendRes } from "../helpers/sendRes.helper.js";
import User from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user);

    return sendRes(res, 200, true, `Welcome Back, ${user?.username}`, { user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // findOne({ username })
    let userDB = await User.findOne({ username });

    // if found => res.send(false,409, "The useran... another")
    if (userDB)
      return next(new ErrorHandler(configResponse.messages.ALREADY_EXIST, 409));

    /*
      LIMIT: one per week
      How to implement
        - if (usingSession?easy:hard)
        - EASY:
          - get user.updatedAt from req.session.user
          - Calculate (today - updatedAt)
          - if (cacl < 7days) return sendRes(400,false,Önce per week)
          - else: continue & update
        - HARD:
          - use calcLimit as a middleware on put('/')
          - There, get the user details, particularly: updatedAt
          - Same Logic as above
          - if OK: next()
    */

    // Hash the password
    const hash = await encryptPassword(password);

    const user = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
        password: hash,
      },
      // TO retrieve the updated version
      { new: true }
    );
    return sendJWT(res, 200, configResponse.messages.USER_UPDATED, user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user);
    if (!user)
      return sendRes(res, 404, false, configResponse.messages.USER_NOT_EXIST);

    return res
      .status(200)
      .cookie("auth_token", "", { expires: new Date(Date.now()) })
      .json({ success: true, msg: configResponse.messages.USER_DELETED });
  } catch (error) {
    return next(error);
  }
};
