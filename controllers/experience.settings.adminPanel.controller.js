const experienceSchemaModel = require("../models/settings.experience.model");


class Experience {

    async getExperience() {
        try {
            const data = await experienceSchemaModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteExperience(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deletecard = await experienceSchemaModel.findByIdAndDelete(_id);
                console.log(_id);
                res.redirect("/admin/panel/settings");
            }
            catch {
                res.status(204).send();
            }

        }
        else {
            res.status(204).send();
        }

    }

    async updateExperience(req, res) {
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.title && req.body.timeperiod && req.body.cpurl && req.body.certificate) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.title!="" && req.body.timeperiod!="" && req.body.cpurl!="" && req.body.certificate != "") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    title: this.sanitizeString(req.body.title),
                    timeperiod: this.sanitizeString(req.body.timeperiod),
                    cpurl: req.body.cpurl,
                    certificate: req.body.certificate
                }
                try{
                    let update = await experienceSchemaModel.findByIdAndUpdate(_id, data);
                    res.redirect("/admin/panel/settings");
                }
                catch{
                    res.status(204).send();
                }
            }
            else {
                res.status(204).send();
            }
        }
        else {
            res.status(204).send();
        }

    }

    async postExperience(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.title && req.body.timeperiod && req.body.cpurl && req.body.certificate) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.title!="" && req.body.timeperiod!="" && req.body.cpurl!="" && req.body.certificate != "") {
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    title: this.sanitizeString(req.body.title),
                    timeperiod: this.sanitizeString(req.body.timeperiod),
                    cpurl: req.body.cpurl,
                    certificate: req.body.certificate
                }
                let result = await this.createNewCard(data);

                if (result) {
                    console.log("yes");
                    res.redirect("/admin/panel/settings");
                }
                else {
                    console.log("no");
                    res.redirect("/admin/panel/settings");
                }
            }
            else {
                res.status(200).send("no2");
            }
        }
        else {
            res.status(200).send("no1");
        }


    }


    async createNewCard(data) {
        try {
            let c1 = new experienceSchemaModel(
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


}





module.exports = Experience;