const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const StudyGroup = require('../models/StudyGroup');
const auth = require('../middleware/auth');

// @route   GET api/tasks
// @desc    Get all tasks for a study group
// @access  Private
router.get('/', auth, async (req, res) => {
    const { studyGroupId } = req.query;
    try {
        // Optional: Check if user is a member of the study group
        const studyGroup = await StudyGroup.findById(studyGroupId);
        if (!studyGroup.members.includes(req.user.id)) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const tasks = await Task.find({ studyGroup: studyGroupId }).populate('assignedTo');
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate, assignedTo, studyGroup } = req.body;

    try {
        // Optional: Check if user is a member of the study group
        const group = await StudyGroup.findById(studyGroup);
        if (!group.members.includes(req.user.id)) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            assignedTo,
            studyGroup
        });

        const task = await newTask.save();

        // Add task to the study group's tasks array
        await StudyGroup.findByIdAndUpdate(studyGroup, { $push: { tasks: task._id } });

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description, dueDate, status, assignedTo } = req.body;

    // Build task object
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (dueDate) taskFields.dueDate = dueDate;
    if (status) taskFields.status = status;
    if (assignedTo) taskFields.assignedTo = assignedTo;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await Task.findByIdAndRemove(req.params.id);

        // Remove the task from the study group's tasks array
        await StudyGroup.findByIdAndUpdate(task.studyGroup, { $pull: { tasks: req.params.id } });

        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 