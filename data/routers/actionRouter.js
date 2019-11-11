const express = require("express");
const Actions = require("../helpers/actionModel.js");
const Projects = require("../helpers/projectModel.js");
const { validateID } = require("../../middleware.js");

const router = express.Router();

// Custom middleware ————————————————————————————————————

// const validateID = async (req, res, next) => {
//   try {
//     const user = await Projects.get(req.params.id);
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       next(new Error("User does not exist"));
//     }
//   } catch (error) {
//     res.status(500).json({ error: "ID not validated" });
//   }
// };

// Routes ————————————————————————————————————————————————

module.exports = router;
