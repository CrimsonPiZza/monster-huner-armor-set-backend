const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
  user_id:{
    type: String,
    require: true,
    unique: true,
  },
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "armorset"
  }]
});

module.exports = mongoose.model("users", schema);