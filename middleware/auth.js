exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) return next();
  res.redirect('/');
};

exports.isRole = (role) => {
  return (req, res, next) => {
    if (req.session.user.role === role) return next();
    res.redirect('/');
  };
};