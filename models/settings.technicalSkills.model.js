const mongoose = require("mongoose");


const technicalSkillsSchema = new mongoose.Schema({
    imageurl:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    visibility:{
        type:Boolean,
        requrie:true
    },
    stars:{
        type:Number,
        requrie:true
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const technicalSkillsSchemaModel = new mongoose.model("setting.technicalSkills", technicalSkillsSchema);

module.exports = technicalSkillsSchemaModel;