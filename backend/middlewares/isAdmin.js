function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the next middleware or route
  } else {
    res.status(403).json({ message: "Interdit : Accès administrateur requis" });
  }
}

module.exports = isAdmin;
