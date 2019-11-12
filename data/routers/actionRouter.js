const express = require("express");
const Actions = require("../helpers/actionModel.js");
const Projects = require("../helpers/projectModel.js");

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

// Operational
const validateProjectID = async (req, res, next) => {
  try {
    const project_id = await Projects.get(req.params.id);
    console.log(project_id);
    if (project_id) {
      req.body.project_id = req.params.id;
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
  console.log("req.body from validateActionBody ::: Action Router", req.body);
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
router.get("/:id/actions", validateID, async (req, res) => {
  try {
    const projectActions = await Projects.getProjectActions(req.params.id);
    res
      .status(200)
      .json({ message: "Successfully retrieved actions", projectActions });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve project actions" });
  }
});

// Operational
router.post(
  "/:id/actions",
  validateProjectID,
  validateActionBody,
  async (req, res) => {
    try {
      const newAction = await Actions.insert(req.body);
      res
        .status(200)
        .json({ message: "Actions added successfully", newAction });
    } catch (error) {
      res.status(500).json({ error: "Couldn't add action" });
    }
  }
);

// Operational
router.delete(
  "/:id/actions/:action_id",
  validateID,
  validateProjectID,
  async (req, res) => {
    try {
      const deleted = await Actions.remove(req.params.action_id);
      res.status(200).json({ message: "Action successfully deleted", deleted });
    } catch (error) {
      res.status(500).json({ error: "Couldn't delete action" });
    }
  }
);

// Failed
router.put(
  "/:id/actions/:action_id",
  validateProjectID,
  validateActionBody,
  async (req, res) => {
    try {
      const updated = await Actions.update(req.params.action_id, req.body);
      res.status(202).json({ message: "Action successfully updated", updated });
    } catch (error) {
      res.status(500).json({ error: "Couldn't update action" });
    }
  }
);

module.exports = router;
