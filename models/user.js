const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  day: {
    type: Number,
    default: 1
  },
  month: {
    type: Number,
    default: 1
  },
  year: {
    type: Number,
    default: 1983
  },
  hour: {
    type: Number,
    default: 1
  },
  minute: {
    type: Number,
    default: 10
  },
  latitude: {
    type: Number,
    default: 41
  },
  longitude: {
    type: Number,
    default: 92
  },
  timezone: {
    type: Number,
    default: 6
  },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
