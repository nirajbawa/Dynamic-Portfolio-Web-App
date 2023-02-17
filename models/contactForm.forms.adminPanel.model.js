const mongoose = require("mongoose");


const contactFormSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        max:100
    },
    mono:{
        type:String,
        require:true,
        max:30
    },
    message:{
        type:String,
        requrie:true,
        max:10000
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const contactFormModel = new mongoose.model("forms.contactForm", contactFormSchema);

module.exports = contactFormModel;