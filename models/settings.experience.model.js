const mongoose = require("mongoose");


const experienceSchema = new mongoose.Schema({
    imageurl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        requrie:true
    },
    timeperiod:{
        type:String,
        requrie:true
    },
    message:{
        type:String,
        require:true
    },
    visibility:{
        type:Boolean,
        requrie:true
    },
    cpurl:{
        type:String,
        require:true
    },
    certificate:
    {
        type:String,
        require:true
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const experienceSchemaModel = new mongoose.model("setting.experience", experienceSchema);

module.exports = experienceSchemaModel;