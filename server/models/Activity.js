const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  time: String,
  notes: String,
  type: {
    type: String,
    enum: ['one-time', 'recurring'],
    default: 'one-time'
  },
  date: {
    type: Date,
    required: function() { return this.type === 'one-time'; }
  },
  frequency: {
    type: String,
    enum: ['everyday', 'interval'],
    required: function() { return this.type === 'recurring'; }
  },
  interval: {
    type: Number,
    required: function() { return this.type === 'recurring' && this.frequency === 'interval'; }
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
