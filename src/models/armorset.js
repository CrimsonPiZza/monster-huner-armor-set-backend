const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  helm: {
    type: String,
    require: true,
  },
  mail: {
    type: String,
    require: true,
  },
  arms: {
    type: String,
    require: true,
  },
  waist: {
    type: String,
    require: true,
  },
  greaves: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  date: {
    type: String,
    require: true,
    default: new Date(),
  }
});

module.exports = mongoose.model("armorsets", schema);