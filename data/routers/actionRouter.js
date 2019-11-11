const express = require("express");
const Actions = require("../helpers/actionModel.js");
const Projects = require("../helpers/projectModel.js");
const { validateID, validateActionBody } = require("../../middleware.js");

const router = express.Router();

// Custom middleware ————————————————————————————————————

// Routes ————————————————————————————————————————————————
router.get("/:id/actions", validateID, (req, res) => {
  try {
    const actions = Actions.get(req.params.id);
    res
      .status(200)
      .json({ message: "Actions retrieved successfully", actions });
  } catch (error) {
    res.status(500).json({ error: "Couldn't retrieve actions" });
  }
});

router.post("/:id/actions", validateID, validateActionBody, (req, res) => {
  try {
    const newAction = Actions.insert(req.body);
    res.status(204).json({ message: "Actions added successfully", newAction });
  } catch (error) {
    res.status(500).json({ error: "Couldn't add action" });
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

router.put("/:id/actions/:action_id", validateID, validateActionBody, (req, res) => {
	try {
		const updated = await Actions.update(req.params.action_id, req.body);
		res.status(202).json({ message: "Action successfully updated", updated })
	} catch (error) {
		res.status(500).json({ error: "Couldn't update action" });
	}
})

module.exports = router;
