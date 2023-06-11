export const sendRes = (
  res,
  StatusCode,
  success,
  msg,
  payload = null,
  error = null
) => {
  res.status(StatusCode).json({
    success,
    msg,
    payload,
    error,
  });
};
