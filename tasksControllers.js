const fs = require("fs");

const dataFilePath = "./data.json";

const errorHandler = (res, status, message) => {
  res.status(status).json({ error: message });
};

const loadTasks = () => {
  try {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Controller functions
const getAllTasks = (req, res) => {
  try {
    const tasks = loadTasks();
    res.json(tasks);
  } catch (error) {
    errorHandler(res, 500, "Internal server error");
  }
};

const addTask = (req, res) => {
  try {
    const tasks = loadTasks();
    const newTask = {
      _id: generateUniqueId(),
      taskName: req.body.taskName,
      completed: false,
      completedAt: null,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.json(newTask);
  } catch (error) {
    errorHandler(res, 500, "Internal server error");
  }
};

const toggleTaskCompletion = (req, res) => {
  const { id } = req.params;
  const completedAt = req.body.completedAt;

  const tasks = loadTasks();

  const taskToUpdate = tasks.find((task) => task._id === id);
  if (!taskToUpdate) {
    return errorHandler(res, 404, "Task not found");
  }

  try {
    taskToUpdate.completed = !taskToUpdate.completed;
    taskToUpdate.completedAt = taskToUpdate.completed ? completedAt : null;
    saveTasks(tasks);
    res.json(taskToUpdate);
  } catch (error) {
    errorHandler(res, 500, "Internal server error");
  }
};

const deleteAllTasks = (req, res) => {
  const tasks = [];
  try {
    saveTasks(tasks);
    res.json({ message: "All tasks deleted" });
  } catch (error) {
    errorHandler(res, 500, "Internal server error");
  }
};

module.exports = {
  getAllTasks,
  addTask,
  toggleTaskCompletion,
  deleteAllTasks,
};
