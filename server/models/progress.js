// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  
  completedLessons: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
  email: { type: String, required: true, unique: true },

  
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
