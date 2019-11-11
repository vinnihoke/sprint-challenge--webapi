const express = require("express");
const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");
const {
  validateID,
  validateProjectID,
  validateProjectBody
} = require("../../middleware.js");

const router = express.Router();

// Custom middleware ————————————————————————————————————

// Routes ————————————————————————————————————————————————

// Needs Testing
router.get("/:id", validateID, async (req, res) => {
  try {
    const projects = await Projects.get(req.params.id);
    res
      .status(200)
      .json({ message: "Successfully retrieved projects", projects });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
});

// Needs Testing
router.get("/:id/actions", validateID, validateProjectID, async (req, res) => {
  try {
    const projectActions = await Projects.getProjectActions(req.params.id);
    res
      .status(200)
      .json({ message: "Successfully retrieved actions", projectActions });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve project actions" });
  }
});

// Needs Testing
router.post("/", async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(204).json({ message: "Successfully added project", project });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

module.exports = router;
