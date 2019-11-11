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
router.post("/", validateProjectBody, async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(204).json({ message: "Successfully added project", project });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// Needs Testing
router.delete("/:id", validateID, async (req, res) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    res.status(202).json({ message: "Project has been successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete project" });
  }
});

// Needs Testing
router.put("/:id", validateID, validateProjectBody, async (req, res) => {
  try {
    const update = await Projects.update(req.params.id, req.body);
    res.status(200).json({ message: "Project successfully updated", update });
  } catch (error) {
    res.status(500).json({ error: "Couldn't update project" });
  }
});

router.delete("/:id/actions/:action_id", validateID, validateProjectID, (req, res) => {
	try {
		const deleted = await Actions.remove(req.params.action_id);
		res.status(200).json({ message: "Action successfully deleted", deleted });
	} catch (error) {
		res.status(500).json({ error: "Couldn't delete action" });
	}
})



module.exports = router;
