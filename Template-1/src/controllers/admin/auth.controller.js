const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error();
        error.message = info?.message || "An error occured";
        error.status = 401;
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          error.status = 401;
          return next(error);
        }
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({
          message: info.message,
          token,
          _id: user._id,
        });
      });
    } catch (error) {
      error.status = 401;
      return next(error);
    }
  })(req, res, next);
};
