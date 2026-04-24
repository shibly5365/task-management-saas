import Task from '../models/Task.js';
import { validateTask } from '../utils/validation.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!validateTask(title)) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      user_id: req.user.id,
      title,
      description: description || ''
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (title !== undefined) {
      if (!validateTask(title)) {
        return res.status(400).json({ message: 'Title is required' });
      }
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (status !== undefined) {
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      task.status = status;
    }

    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
