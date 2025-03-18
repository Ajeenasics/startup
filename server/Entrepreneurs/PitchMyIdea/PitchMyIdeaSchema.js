const mongoose = require('mongoose')

const pitch_my_ideaSchema = mongoose.Schema({
    epId: {
      type: String,
      required: true,
    }, 
    companyName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    audience: {
      type: String,
      required: true,
    },
    workingArea: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    competitor1: {
      type: String,
      required: true,
    },
    competitor2: {
        type: String,
        required: true,
    },
    differentiator:{
        type: String,
        required: true,
    },
    currentStatus: {
        type: String,
        required: true,
    },
    expectedHelpCategory:{
        type: String,
        required: true,
    },
    expectedHelp: {
        type: String,
        required: true,
    },
    equityAmount: {
        type: Number,
        required: true,
    },
    IsActive: {
      type: Boolean,
      required: true,
    },status: {
      type: Boolean,
      required: true,
    },
  });
  module.exports = mongoose.model("pitch_my_idea_data", pitch_my_ideaSchema);
  