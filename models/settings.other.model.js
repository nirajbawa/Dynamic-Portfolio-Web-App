const mongoose = require("mongoose");


const otherSchema = new mongoose.Schema({
    imageurl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    url1:{
        type:String,
        require:true
    },
    url2:{
        type:String,
        require:true
    },
    url3:{
        type:String,
        require:true
    },
    url4:{
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


const otherModel = new mongoose.model("setting.other", otherSchema);

module.exports = otherModel;