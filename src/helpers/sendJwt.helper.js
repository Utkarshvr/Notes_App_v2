import jwt from "jsonwebtoken";

export default function sendJWT(res, statusCode = 200, msg = "success", user) {
  const auth_token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(statusCode)
    .cookie("auth_token", auth_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      msg,
      payload: { user },
    });
}
