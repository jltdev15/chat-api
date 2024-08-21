const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const cookies = req.cookies["jwt"];
    console.log(cookies);
    jwt.verify(cookies, "my_secret", (err, user) => {
      if (err) return res.sendStatus(401);
      console.log(user);
      console.log("Token is correct and not expired");
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(404).json({
      content: err,
    });
  }
};
