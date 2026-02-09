const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));

// test route
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

const PORT = process.env.PORT || 4849;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
