const aboutModel = require("../models/settings.other.model");


class otherSettings {

    async getotherSettings() {
        try {
            const data = await aboutModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteotherSettings(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deletecard = await aboutModel.findByIdAndDelete(_id);
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

    async updateotherSettings(req, res) {
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.url1 && req.body.url2 && req.body.url3 && req.body.url4 && req.body.title) {
            if (req.body.visibility != "" && req.body.title!="") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    url1:req.body.url1,
                    url2:req.body.url2,
                    url3:req.body.url3,
                    url4:req.body.url4,
                    title:req.body.title
                }
                try{
                    let update = await aboutModel.findByIdAndUpdate(_id, data);
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

    async postotherSettings(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.url1 && req.body.url2 && req.body.url3 && req.body.url4 && req.body.title) {
            if (req.body.visibility != "" && req.body.title!="") {
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    url1:req.body.url1,
                    url2:req.body.url2,
                    url3:req.body.url3,
                    url4:req.body.url4,
                    title:req.body.title
                }
                let result = await this.createNewCard(data);

                if (result) {
                    res.redirect("/admin/panel/settings");
                }
                else {
                    res.redirect("/admin/panel/settings");
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


    async createNewCard(data) {
        try {
            let c1 = new aboutModel(
                data
            );

            let result = await c1.save();
            return true;
        }
        catch {
            return false;
        }
    }


    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }


}





module.exports = otherSettings;