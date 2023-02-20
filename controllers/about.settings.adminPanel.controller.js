const aboutModel = require("../models/settings.about.model");


class About {

    async getAbout() {
        try {
            const data = await aboutModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteAbout(req, res) {
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

    async updateAbout(req, res) {
        if (req.body.imageurl && req.body.title && req.body.visibility && req.body.htmlcontent) {
            if (req.body.imageurl != "" && req.body.title != "" && req.body.visibility != "" && req.body.htmlcontent!="") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    title: this.sanitizeString(req.body.title),
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    htmlcontent: req.body.htmlcontent
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

    async postAbout(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.title && req.body.visibility && req.body.htmlcontent) {
            if (req.body.imageurl != "" && req.body.title != "" && req.body.visibility != "" && req.body.htmlcontent!="") {
                let data = {
                    imageurl: req.body.imageurl,
                    title: this.sanitizeString(req.body.title),
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    htmlcontent: req.body.htmlcontent
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





module.exports = About;