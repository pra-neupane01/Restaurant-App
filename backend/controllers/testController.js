const testUserController = (req, resp) => {
  try {
    resp.status(200).send("<h1> Testing..</h1>");
  } catch (error) {
    console.log("Error in test api", error);
  }
};

module.exports = { testUserController };
