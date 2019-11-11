const Actions = require("./data/helpers/actionModel.js");
const Projects = require("./data/helpers/projectModel.js");

export const validateID = async (req, res, next) => {
  try {
    const user = await Projects.get(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error("User does not exist"));
    }
  } catch (error) {
    res.status(500).json({ error: "ID not validated" });
  }
};

export const validateProjectID = async (req, res, next) => {
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

export const validateProjectBody = async (req, res, next) => {
  !req.body
    ? res.status(400).json({ message: "No data received" })
    : !req.body.name
    ? res.status(400).json({ message: "Missing required name value" })
    : !req.body.description
    ? res.status(400).json({ message: "Missing required description value" })
    : next();
};

export const validateActionBody = async (req, res, next) => {
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
