const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get token
    const token = req.headers["authorization"].split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Un Authorized user",
        });
      } else {
        req.user = { id: decode.id };
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error,
    });
  }
};
