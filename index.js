const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksControllers = require('./tasksControllers');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/tasks', tasksControllers.getAllTasks);
app.post('/tasks', tasksControllers.addTask);
app.put('/tasks/:id', tasksControllers.toggleTaskCompletion);
app.delete('/tasks', tasksControllers.deleteAllTasks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
