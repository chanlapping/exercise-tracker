const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  createExercise,
  getLogs,
} = require("../controllers/users");

router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/:_id/exercises", createExercise);
router.get("/:_id/logs", getLogs);

module.exports = router;
