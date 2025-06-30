const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudyGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  resources: [{
    name: String,
    path: String // This could be a URL or a path to a file on the server
  }]
});

module.exports = mongoose.model('StudyGroup', StudyGroupSchema); 