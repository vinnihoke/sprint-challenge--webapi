const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter.js");

const server = express();

// This is our middleware
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use("/api/project/", projectRouter);
server.use("/api/actions/", actionRouter);

server.get("/", (req, res) => {
  res.status(100).json({ message: "API Ready." });
});

module.exports = server;
