const mongoose = require("mongoose");

const schema = mongoose.Schema({
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "armorset"
  }],
  user_id:{
    type: String,
    require: true,
    index: true,
  }
});

module.exports = mongoose.model("users", schema);