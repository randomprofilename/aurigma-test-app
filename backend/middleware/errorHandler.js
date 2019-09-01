module.exports = (err, req, res, next) => {
  res.status(400).json({ message: err.message || "Something bad happened", stack: err.stack });
};