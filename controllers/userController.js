const { token } = require("morgan");
// why i am not getting  the req.body value?? -- because: GET ROUTE: req.user.id & POST route: req.body

const userController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

module.exports = { userController };
