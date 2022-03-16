const passport = require("passport");

const authenticate = passport.authenticate("jwt", { session: false });
const authenticateWithOptinal = (req, res, next) => {
  const auth = (req.cookies && req.cookies['token']) ||req.header("Authorization");
  if (auth) {
    authenticate(req, res, next);
  } else {
    next();
  }
};

module.exports = {
  authenticate,
  authenticateWithOptinal,
};
