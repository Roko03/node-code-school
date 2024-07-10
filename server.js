require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./utils/connectDB");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const userRouter = require("./router/user");

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use("/api/v1/auth", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const server = async () => {
  try {
    await connectDB();
    app.listen(port, console.log("Server is running"));
  } catch (error) {
    console.log(error);
  }
};

server();
