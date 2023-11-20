const AdminUserSchemaModel = require("../models/adminAuth.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const adminSingUp = require("./adminSignUp.controller");
const nodemailer = require('nodemailer');
const bcrypt_ = require("bcryptjs");


class AdminSignIn {
    getSignin(req, res) {
        if (req.session.user == undefined) {
            res.render("adminSignIn", { Msg: "" });
        }
        else {
            res.redirect("/admin/panel/");
        }
    }
    async postSignin(req, res) {
        if (req.session.user == undefined) {
            if (req.session.otpsignin == undefined && req.session.signindata == undefined) {
                if (req.body.email && req.body.password && req.body.email != "" && req.body.password != "") {
                    if (validator.isEmail(req.body.email)) {
                        let spassword = String(req.body.password);
                        if (spassword.length > 8) {
                            let checkUser = await AdminUserSchemaModel.find({ email: req.body.email });
                            console.log(checkUser);
                            console.log(checkUser.length);

                            if (checkUser.length > 0) {
                                let checkPassword = await AdminUserSchemaModel.findOne({ email: req.body.email }).select({ password: 1 });
                                console.log(checkPassword);
                                const passwordMatch = await bcrypt.compare(spassword, checkPassword.password);
                                console.log(passwordMatch);
                                if (passwordMatch == true) {
                                    let AdminSignUpController = new adminSingUp();
                                    let otp = AdminSignUpController.sendOtp(req.body.email);
                                    console.log("otp: " + otp);
                                    if (otp != false) {
                                        setTimeout(() => {
                                            console.log("otp timer 1");
                                            req.session.otpsignin = undefined;
                                        }, 300000);

                                        req.session.otpsignin = String(otp);
                                        req.session.signindata = { email: req.body.email, id: checkPassword._id };
                                        req.session.save();
                                        console.log("success");
                                        res.render("admin_otp_verification", { errorMsg: "OTP is sended on your email.", url: "/admin/signin", btnName: "Sign Up", otpurl: "/admin/signin/otp" });
                                    }
                                    else {
                                        res.redirect("/");
                                    }

                                }
                                else {
                                    res.render("adminSignIn", { Msg: "Password is in correct" });
                                }
                            }
                            else {
                                res.render("adminSignIn", { Msg: "User is not register" });
                            }
                        }
                        else {
                            res.render("adminSignIn", { Msg: "Please make sure your password length is greater than 8" });
                        }
                    }
                    else {
                        res.render("adminSignIn", { Msg: "Please enter valid email." });
                    }
                }
                else {
                    res.render("adminSignIn", { Msg: "Please fill all fields." });
                }
            }
            else {
                console.log(req.body);
                console.log(req.session.otpsignin);
                try {
                    if (req.session.otpsignin == req.body.otp && req.body.otp != undefined && req.session.otpsignin != undefined) {
                        console.log(req.session.signindata);
                        req.session.user = req.session.signindata.email;
                        req.session.otpsignin = undefined;
                        req.session.signindata = undefined;
                        req.session.save();
                        console.log("getted");
                        res.redirect("/admin/panel/");
                    }
                    else {
                        res.render("admin_otp_verification", { errorMsg: "Please enter correct OTP.", url: "/admin/signin", btnName: "Sign Up", otpurl: "/admin/signin/otp" });
                    }
                }
                catch {
                    res.redirect("/");
                }

            }

        }
        else {
            res.redirect("/");
        }
    }

    signOut(req, res) {
        req.session.user = undefined;
        res.redirect("/");
    }

    getForgotPassword(req, res) {
        if (req.session.user == undefined) {

            res.render("adminForgotPassword", { Msg: "" });
        }
        else {
            res.redirect("/");
        }
    }

    getForgotPasswordReset(req, res)
    {
        console.log(req.params);
        if (req.session.user == undefined && req.session.fpotp != undefined && req.params != undefined) {
            if(req.session.fpotp==req.params.id)
            {
                res.render("adminResetPassword", { Msg: "", resturl : req.params});
            }
            else{
                res.redirect("/");
            }
        }
        else{
            res.redirect("/");
        }
    }

    async postForgotPasswordReset(req, res)
    {
        if (req.session.user == undefined && req.session.fpotp != undefined && req.params != undefined && req.body!=undefined) {
            if(req.session.fpotp==req.params.id)
            {
                if(req.body.password1==req.body.password2)
                {
                    console.log(req.body);

                    let hashpass = await bcrypt_.hash(String(req.body.password1), 10);

                    let update = await AdminUserSchemaModel.updateOne({email:req.params.uid},{$set:{password:hashpass}});

                    res.render("adminResetPassword", { Msg: "password reset succsessfully", resturl :""});
                }
                else{
                    res.render("adminResetPassword", { Msg: "both passwords are not same", resturl : req.params });
                }
            }
            else{
                res.redirect("/");
            }
        }
        else{
            res.redirect("/");
        }
    }

    async postForgotPassword(req, res) {
        if (req.session.user == undefined) {
            let host = req.get('host');

            let checkUser = await AdminUserSchemaModel.find({ email: req.body.email });

            if (checkUser.length > 0) {

                let otp = this.sendRestLink(host, checkUser[0].email);

                if (otp != false) {
                    setTimeout(() => {
                        req.session.fpotp = undefined;
                    }, 300000);

                    req.session.fpotp = otp;
                    req.session.save();

                    res.render("adminForgotPassword", { Msg: "password reset Link is send on registered email" });
                }

                else {
                    res.redirect("/");
                }
            }
            else{
                res.render("adminForgotPassword", { Msg: "User is not register" });
            }
        }
        else {
            res.redirect("/");
        }
    }


    sendRestLink(host, email) {

        let otp = Math.floor(Math.random() * 5000) + 1000;
        console.log(otp);

        let EmailId = process.env.EMAIL;
        let Password = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
            auth: {
                user: EmailId,
                pass: Password,
            },
            secure: true,
        });

        const mailData = {
            from: EmailId,  // sender address
            to: email,   // list of receivers
            subject: 'Portfolio Web App Admin Password Reset',
            html: `<br/><br/><br/><b>Admin Password Reset Link : </b> http://${host}/admin/forgotpassword/${otp}/${email}<br/><br/><br/>Only valid for 5 minutes.<br/>`
        };

        transporter.sendMail(mailData);

        return otp;
    }

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }

    sendOtpAgain(req, res) {
        if (req.session.signindata) {
            console.log("ok");
            let AdminSignUpController = new adminSingUp();
            let sendotp = AdminSignUpController.sendOtp(req.session.signindata.email);
            if (sendotp != false) {


                setTimeout(() => {
                    console.log("otp timer 2");
                    req.session.otpsignin = undefined;
                }, 300000);

                req.session.otpsignin = String(sendotp);

                req.session.save();
                console.log("success");
                res.send({ errorMsg: "OTP Sended" });
            }
            else {
                res.send({ errorMsg: "Error" });
            }
        }
        else {
            res.send({ errorMsg: "Error" });
        }
    }


}



module.exports = AdminSignIn;