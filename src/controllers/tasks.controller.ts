import { Response } from "express";
import { Task } from "../models/tasks";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create a new task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userEmail = req.user.email; // Get email from authenticated user payload

    if (!title || !description) {
      return res.status(400).json({ message: "Task title and description are required" });
    }

    const newTask = new Task({
      title,
      description,
      email: userEmail,
    });

    await newTask.save();
    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for the authenticated user
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userEmail = req.user.email;
    const tasks = await Task.find({ email: userEmail });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a single task by ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const task = await Task.findOne({ _id: id, email: userEmail });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a task by ID
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userEmail = req.user.email;

    if (!title && !description) {
      return res.status(400).json({ message: "Provide at least a title or description to update" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, email: userEmail },
      { $set: { ...(title && { title }), ...(description && { description }) } },
      { new: true } // Returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a task by ID
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const deletedTask = await Task.findOneAndDelete({ _id: id, email: userEmail });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
