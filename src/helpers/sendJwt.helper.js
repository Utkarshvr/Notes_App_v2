import jwt from "jsonwebtoken";

export default function sendJWT(
  res,
  statusCode = 200,
  message = "success",
  user
) {
  const auth_token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("auth_token", auth_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "none",
    })
    .json({
      success: true,
      message,
      data: { user },
    });
}
