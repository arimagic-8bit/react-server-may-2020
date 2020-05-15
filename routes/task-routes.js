//      routes/task-routes.js

const express = require("express");
const mongoose = require("mongoose");
const taskRouter = express.Router();

const Project = require("./../models/project-model");
const Task = require("./../models/task-model");

// GET '/api/projects/:projectId/tasks/:taskId'   => to retrieve a specific task

taskRouter.get("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  Task.findById(taskId)
    .populate('project')
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST '/api/tasks'      => to create a new task

taskRouter.post("/tasks", (req, res, next) => {

    // This is the data that that the server receives from FORMS AXIOS FETCH
  const { title, description, projectId } = req.body;

    // THIS IS WHAT THE SERVER GIVES US
  Task.create({ title, description, project: projectId })
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT '/api/tasks/:id'    => to update a specific task

// DELETE '/api/tasks/:id'     => to delete a specific task

module.exports = taskRouter;
