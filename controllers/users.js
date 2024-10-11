const User = require("../models/User");
const Log = require("../models/Log");

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  const { username, _id } = user;
  res.status(200).json({ username, _id });
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("username");
  res.status(200).json(users);
};

const createExercise = async (req, res) => {
  const { description, duration, date } = req.body;
  let dateObj = new Date();
  if (date) {
    dateObj = new Date(date);
  }

  const { _id: userId } = req.params;

  const logItem = await Log.create({
    user: userId,
    description,
    duration: +duration,
    date: dateObj,
  });

  const user = await User.findById(userId);
  res.status(200).json({
    username: user.username,
    ...logItem.logItem,
    _id: user._id,
  });
};

const getLogs = async (req, res) => {
  const { _id: userId } = req.params;
  const user = await User.findById(userId);

  const { from, to, limit } = req.query;
  const queryObj = { user: userId };
  let dateFilter = {}
  if (from) {
    dateFilter.$gte = new Date(from);
  }
  if (to) {
    dateFilter.$lte = new Date(to);
  }
  if (Object.keys(dateFilter).length > 0) {
    queryObj.date = dateFilter;
  }

  let logs = Log.find(queryObj);
  if (limit) {
    logs = logs.limit(limit);
  }
  logs = await logs;

  res.json({
    username: user.username,
    count: logs.length,
    _id: user._id,
    log: logs.map((item) => item.logItem),
  });
};

module.exports = {
  createUser,
  getAllUsers,
  createExercise,
  getLogs,
};
