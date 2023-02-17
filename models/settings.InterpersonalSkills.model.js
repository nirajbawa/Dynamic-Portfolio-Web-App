const mongoose = require("mongoose");


const InterpersonalSkillsSchema = new mongoose.Schema({
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
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const InterpersonalSkillsModel = new mongoose.model("setting.InterpersonalSkills", InterpersonalSkillsSchema);

module.exports = InterpersonalSkillsModel;