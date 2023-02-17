const validator = require("validator");
const contactFormModel = require("../models/contactForm.forms.adminPanel.model");
const AdminUserSchemaModel = require("../models/adminAuth.model");
const nodemailer = require('nodemailer');

class contactForm{

    async getContactForm()
    {
        try{
            const data = await contactFormModel.find().sort({ timestamp: -1 });
            return data;
        }
        catch{
            return "[]";
        }       
    }

    async deleteContactForm(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deleteform = await contactFormModel.findByIdAndDelete(_id);
                console.log(_id);
                res.redirect("/admin/panel/forms");
            }
            catch {
                res.status(204).send();
            }

        }
        else {
            res.status(204).send();
        }

    }

    async PostForm(req, res){
        if(req.body)
        {
            if(req.body.email && req.body.countrycode && req.body.mono && req.body.message)
            {
                if(req.body.email !="" && req.body.countrycode !="" && req.body.mono !="" && req.body.message !="")
                {
                    let countrycode = `+${this.sanitizeString(req.body.countrycode)}`;
                    let mono = `${this.sanitizeString(req.body.mono)}`;
                    let email = req.body.email;
                    let message = this.sanitizeString(req.body.message);
                  
                    if(validator.isEmail(email))
                    {
                        if(this.testNumber(countrycode) && this.testNumber(mono))
                        {
                         
                            let data = {
                                email,
                                mono:`${countrycode}${mono}`,
                                message
                            }
                            
                            this.createNewForm(data);
                            this.sendFormEmailToAdmin(data)
                            res.send({Msg:"Form Submited"});
                        }
                        else{
                            res.send({Msg:"Mo.No Is Invalid"});
                        }
                    }
                    else{
                        res.send({Msg:"Email Is Invalid"});
                    }
                   
                }
                else{
                    res.redirect("/*");
                } 
            }
            else{
                res.redirect("/*");
            }
        }
        else{
            res.redirect("/*");
        }
    }

    async sendFormEmailToAdmin(data) {

        let EmailId = process.env.EMAIL;
        let Password = process.env.PASSWORD;

        let checkUser = await AdminUserSchemaModel.find();


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
            to: checkUser[0].email,   // list of receivers
            subject: 'Portfolio Web App Contact Form Submited By '+data.email,
            html: `<br/><br/><br/><b> Mo.No :</b> ${data.mono} <br/><br/> <b> Message </b> : <br/><br/> ${data.message} <br/>`
        };

        transporter.sendMail(mailData);

        return true;
    }


    async createNewForm(data) {
        try {
            let c1 = new contactFormModel(
                data
            );

            let result = await c1.save();
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }

    testNumber(input)
    {
        return /\d/.test(input);
    }
}



module.exports = contactForm;