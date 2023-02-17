const mongoose = require("mongoose");


const aboutSchema = new mongoose.Schema({
    imageurl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    htmlcontent:{
        type:String,
        requrie:true
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


const aboutModel = new mongoose.model("setting.about", aboutSchema);

module.exports = aboutModel;