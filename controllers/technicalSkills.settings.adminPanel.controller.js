const TechnicalSkillssModel = require("../models/settings.technicalSkills.model");


class technicalSkills {

    async getTechnicalSkills() {
        try {
            const data = await TechnicalSkillssModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteTechnicalSkills(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deletecard = await TechnicalSkillssModel.findByIdAndDelete(_id);
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

    async updateTechnicalSkills(req, res) {
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.Stars) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.Stars !="") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    stars: Number.parseInt(req.body.Stars)
                }
                try{
                    let update = await TechnicalSkillssModel.findByIdAndUpdate(_id, data);
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

    async postTechnicalSkills(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.Stars) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.Stars!="") {
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    stars: Number.parseInt(req.body.Stars)
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
            let c1 = new TechnicalSkillssModel(
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





module.exports = technicalSkills;