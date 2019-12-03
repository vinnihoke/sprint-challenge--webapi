const express = require("express");
const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");

const router = express.Router();

// Custom middleware ————————————————————————————————————
const validateID = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next(new Error("Project does not exist"));
    }
  } catch (error) {
    res.status(500).json({ error: "Project ID not validated" });
  }
};

const validateProjectID = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next(new Error("Project does not exist"));
    }
  } catch (error) {
    res.status(500).json({ error: "Project not validated" });
  }
};

const validateProjectBody = async (req, res, next) => {
  !req.body
    ? res.status(400).json({ message: "No data received" })
    : !req.body.name
    ? res.status(400).json({ message: "Missing required name value" })
    : !req.body.description
    ? res.status(400).json({ message: "Missing required description value" })
    : next();
};

const validateActionBody = async (req, res, next) => {
  !req.body
    ? res.status(400).json({ message: "No data received" })
    : !req.body.project_id
    ? res.status(400).json({ message: "Missing required project_id value" })
    : !req.body.description
    ? res.status(400).json({ message: "Missing required description value" })
    : !req.body.notes
    ? res.status(400).json({ message: "Missing required notes value" })
    : next();
};

// Routes ————————————————————————————————————————————————

// Operational
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

// Operational

// Needs Testing
router.post("/", validateProjectBody, async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(200).json({ message: "Successfully added project", project });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// Operational
router.delete("/:id", validateID, async (req, res) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    res.status(204).json({ message: "Project has been successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete project" });
  }
});

// Operational
router.put("/:id", validateID, validateProjectBody, async (req, res) => {
  try {
    const update = await Projects.update(req.params.id, req.body);
    res.status(200).json({ message: "Project successfully updated", update });
  } catch (error) {
    res.status(500).json({ error: "Couldn't update project" });
  }
});

module.exports = router;
