const AdminUserSchemaModel = require("../models/adminAuth.model");

let createUserAuth = async (req, res, next) => {
    const result = await AdminUserSchemaModel.find();
    if (result.length==0) {
        next();
    }
    else {
        res.redirect("/");
    }
}

module.exports = createUserAuth;