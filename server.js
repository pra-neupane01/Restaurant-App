const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { userSchema } = require("./models/userSchema");
const { restaurantSchema } = require("./models/restaurantModel");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoute"));

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

const PORT = process.env.PORT || 4849;

const initializeDatabase = async () => {
  try {
    await userSchema();
    await restaurantSchema();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing database schema:", error.message);
    process.exit(1);
  }
};

initializeDatabase();
