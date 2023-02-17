const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AdminUserSchema = new mongoose.Schema({

    fname: {
        type: String,
        require: [true, "Full Name is required"],
    },

    phone: {
        type: String,
        require:[true, "Mobile Number is required"],
        unique: [true, "Mobile Number is already Register please try to login"],
        partialFilterExpression: { mobile: { '$type': 'string' } }, 
    },

    email: {
        type: String,
        require:[true, "Email is required"],
        unique:  [true, "Email is already Register please try to login"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email not valid");
            }
        }
    },

    password: {
        type: String,
        require: [true, "Password is required"],
    }

})


AdminUserSchema.pre("save", async function(next){
    console.log(this.password);
    this.password  = await bcrypt.hash(String(this.password), 10);

    console.log(this.password);
    
    next();
});


const AdminUserSchemaModel = new mongoose.model("admin_users", AdminUserSchema);

module.exports = AdminUserSchemaModel;