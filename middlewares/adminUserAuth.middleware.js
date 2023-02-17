
let createUserAuth = async (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user!=undefined) {
        console.log(req.session.user);
        next();
    }
    else {
        res.redirect("/");
    }
}

module.exports = createUserAuth;
