import jwt from "jsonwebtoken";
import configResponse from "../../config.js";

export default async function isAuthenticated(req, res, next) {
  const { auth_token } = req.cookies;
  if (!auth_token) {
    return res
      .status(401)
      .json({ success: false, msg: configResponse.messages.NOT_AUTHENTICATED });
  }
  try {
    const data = jwt.verify(auth_token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch ({ message }) {
    res.status(500).json({ success: false, msg: message });
  }
}
