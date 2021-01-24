const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email : {
    type : String,
    require : true
  },
  profile_src: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
  }
});

module.exports = mongoose.model("Students", schema);
