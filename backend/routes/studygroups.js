const express = require('express');
const router = express.Router();
const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/studygroups
// @desc    Get all study groups for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const studyGroups = await StudyGroup.find({ members: req.user.id }).populate('members').populate('tasks');
        res.json(studyGroups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/studygroups
// @desc    Create a study group
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name } = req.body;
    const members = [req.user.id]; // Creator is automatically a member

    try {
        const newStudyGroup = new StudyGroup({
            name,
            members
        });

        const studyGroup = await newStudyGroup.save();

        // Add this study group to the creator's list of study groups
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { studyGroups: studyGroup._id } }
        );

        res.json(studyGroup);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/studygroups/:id
// @desc    Get study group by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id).populate('members').populate('tasks');
        if (!studyGroup) {
            return res.status(404).json({ msg: 'Study group not found' });
        }
        // Check if user is a member of the study group
        if (!studyGroup.members.some(member => member._id.equals(req.user.id))) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        res.json(studyGroup);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/studygroups/:id/members
// @desc    Add a member to a study group
// @access  Private
router.post('/:id/members', auth, async (req, res) => {
    const { email } = req.body;

    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (!studyGroup) {
            return res.status(404).json({ msg: 'Study group not found' });
        }
        
        // Check if the logged-in user is a member of the group
        if (!studyGroup.members.some(memberId => memberId.equals(req.user.id))) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (studyGroup.members.some(memberId => memberId.equals(user._id))) {
            return res.status(400).json({ msg: 'User is already a member of this group' });
        }

        studyGroup.members.push(user._id);
        user.studyGroups.push(studyGroup._id);

        await studyGroup.save();
        await user.save();

        res.json(studyGroup.members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router; 