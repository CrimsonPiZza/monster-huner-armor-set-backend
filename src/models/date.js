const mongoose = require("mongoose");

const schema = mongoose.Schema({
    date : {
        type : String,
        require : true,
        unique: true,
        index: true
    },
    sessions : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : "Sessions"
    }]
});

module.exports = mongoose.model("Dates", schema);
