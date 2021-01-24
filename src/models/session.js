const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    startTime:{
        type : String,
        require : true
    },
    endTime:{
        type : String,
        require : true
    },
    absentees : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Students"
    }],
    date : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Dates" 
    }
});

module.exports = mongoose.model("Sessions", schema);
