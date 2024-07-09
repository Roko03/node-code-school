const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const server = async () => {
  try {
    app.listen(port, console.log("Server is running"));
  } catch (error) {
    console.log(error);
  }
};

server();
