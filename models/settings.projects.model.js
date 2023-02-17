const mongoose = require("mongoose");


const projectsSchema = new mongoose.Schema({
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
    projecturl:{
        type:String,
        require:true
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const projectsSchemaModel = new mongoose.model("setting.projects", projectsSchema);

module.exports = projectsSchemaModel;