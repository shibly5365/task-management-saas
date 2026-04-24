export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ message: "Email already exists" });
  }

  if (err.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ message: err.errors[0]?.message || "Validation error" });
  }

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ message });
};
