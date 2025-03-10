require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./utils/connectDB");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const professorRouter = require("./router/professor");
const studentRouter = require("./router/student");

const authenticationUser = require("./middleware/authentication");
const roleAuthentication = require("./middleware/role-authentication");

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use("/api/v1/auth", authRouter);
app.use(
  "/api/v1/admin",
  authenticationUser,
  roleAuthentication("adm"),
  adminRouter
);

app.use(
  "/api/v1/professor",
  authenticationUser,
  roleAuthentication("prof"),
  professorRouter
);

app.use(
  "/api/v1/student",
  authenticationUser,
  roleAuthentication("stu"),
  studentRouter
);

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
