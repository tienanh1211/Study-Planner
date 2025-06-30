const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  studyGroup: {
    type: Schema.Types.ObjectId,
    ref: 'StudyGroup',
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema); 