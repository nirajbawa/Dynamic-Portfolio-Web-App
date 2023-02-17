const AdminUserSchemaModel = require("../models/adminAuth.model");
const nodemailer = require('nodemailer');
const validator = require("validator");

class adminSinguUp {
    getSignup(req, res) {
        res.render("adminSignUP", { errorMsg: "" });
    }

    async postSignup(req, res) {
        if (req.session.Udata == undefined && req.session.otp == undefined) {
            console.log(":", req.body);
            try {
                if (req.body.Fname && req.body.mobile && req.body.Email && req.body.password && req.body.Fname != "" && req.body.mobile != "" && req.body.Email != "" && req.body.password != "") {
                    console.log("if 1");
                    console.log("if 2");
                    let mono = Number.parseInt(req.body.mobile);
                    let monov = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(mono);
                    console.log("monno : ", monov);
                    if (monov == true && validator.isEmail(String(req.body.Email))) {

                        if (String(req.body.password).length > 8) {

                            let valiation = await AdminUserSchemaModel.find({ $and: [{ phone: req.body.mobile, email: req.body.Email }] });
                            if (valiation.length == 0) {

                                let data = {
                                    fname: this.sanitizeString(String(req.body.Fname)),
                                    email: req.body.Email,
                                    phone: String(mono),
                                    password: this.sanitizeString(String(req.body.password))
                                }
                                console.log("data:", data);

                                let sendotp = this.sendOtp(data.email);
                                if (sendotp != false) {


                                    setTimeout(()=>{
                                        req.session.otp = undefined;
                                    }, 300000);

                                    req.session.otp = String(sendotp);
                                    console.log(req.session.otp);
                                    req.session.Udata = data;

                                    req.session.save();
                                    console.log("success");
                                    

                                    res.render("admin_otp_verification", { errorMsg: "OTP is sended on your email.", url:"/admin/signup", btnName:"Sign Up", otpurl:"/admin/signup/otp"});
                                }
                                else {
                                    res.render("adminSignUP", { errorMsg: "Try again" });
                                }

                            }
                            else {
                                console.log("else 2");
                                res.render("adminSignUP", { errorMsg: "Email or mobile number is already register." });
                            }

                        }
                        else {
                            res.render("adminSignUP", { errorMsg: "Please make sure your entered password len is grater than 8 characters." });
                        }


                    }
                    else {
                        res.render("adminSignUP", { errorMsg: "Please enter valid email and mobile number." });
                    }



                }
                else {
                    res.render("adminSignUP", { errorMsg: "please fill all fields." });
                }
            }
            catch (e) {
                console.log(e);
                res.redirect("/admin/signup");
            }
        }
        else {
            console.log("::", req.body.otp);
            console.log("::", req.session.otp);
            if (req.session.otp == req.body.otp && req.body.otp!=undefined && req.session.otp != undefined) {
                let user = await this.createUser(req.session.Udata);
                if (user == true) {

                    req.session.user = req.session.Udata.email;
                    req.session.Udata = undefined;
                    req.session.otp = undefined;
                    req.session.save();
                    res.redirect("/admin/panel/");
                }
                else {
                    req.session.Udata = undefined;
                    req.session.otp = undefined;
                    req.session.save();
                    res.redirect("/admin/signup");
                }
            }
            else {
                res.render("admin_otp_verification", { errorMsg: "Please enter correct OTP.", url:"/admin/signup", btnName:"Sign Up", otpurl:"/admin/signup/otp"});
            }

        }
    }

    sendOtpAgain(req, res) {
        console.log("op: "+req.session.otp);
        if (req.session.Udata) {
            console.log("op: "+req.session.otp);
            let sendotp = this.sendOtp(req.session.Udata.email);
            if (sendotp != false) {
                setTimeout(()=>{
                    req.session.otp = undefined;
                }, 300000);
                req.session.otp = String(sendotp);
                req.session.save();
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

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }

    sendOtp(semail) {
        try {
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
                to: semail,   // list of receivers
                subject: 'Portfolio Web App Admin Verification',
                html: `<br/><br/><br/><b>OTP : </b> ${otp}<br/><br/><br/>Only valid for 5 minutes.<br/>`
            };

            transporter.sendMail(mailData);

            return otp;
        }
        catch (e) {
            return false;
        }

    }

    async createUser(data) {
        console.log(data);
        try {
            let u1 = new AdminUserSchemaModel(
                data
            );

            let result = await u1.save();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}



module.exports = adminSinguUp;