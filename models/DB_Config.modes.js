const mongoose = require("mongoose");

mongoose.set("strictQuery", true)
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful");
}, (e)=>{
    console.log("database connection error");
});