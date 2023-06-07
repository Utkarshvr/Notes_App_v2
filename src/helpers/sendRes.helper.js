export const sendRes = (
  res,
  StatusCode,
  success,
  msg,
  data = null,
  error = null
) => {
  res.status(StatusCode).json({
    success,
    msg,
    data,
    error,
  });
};
