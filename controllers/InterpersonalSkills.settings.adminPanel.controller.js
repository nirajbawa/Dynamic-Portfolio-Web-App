const InterpersonalSkillsModel = require("../models/settings.InterpersonalSkills.model");


class InterpersonalSkills {

    async getInterpersonalSkills() {
        try {
            const data = await InterpersonalSkillsModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteInterpersonalSkills(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deletecard = await InterpersonalSkillsModel.findByIdAndDelete(_id);
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

    async updateInterpersonalSkills(req, res) {
        if (req.body.imageurl && req.body.message && req.body.visibility) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false
                }
                try{
                    let update = await InterpersonalSkillsModel.findByIdAndUpdate(_id, data);
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

    async postInterpersonalSkills(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.message && req.body.visibility) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "") {
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false
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
            let c1 = new InterpersonalSkillsModel(
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





module.exports = InterpersonalSkills;