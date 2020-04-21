module.exports = (req, res, next) => {
  req.session.logged
    ? next()
    : res.status(401).json({ message: "must be logged in" });
};
