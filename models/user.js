const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  totalSavings: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  currentEnvFootprint: {
    type: Number,
    default: 0
  },
  envFootprintTotal: {
    type: Number,
    default: 0
  },
  date: { type: Date, 
    default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
