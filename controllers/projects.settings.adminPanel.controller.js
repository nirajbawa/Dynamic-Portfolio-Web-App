const projectsSchemaModel = require("../models/settings.projects.model");


class Projects {

    async getProjects() {
        try {
            const data = await projectsSchemaModel.find().sort({ timestamp: -1 });
            return data
        }
        catch {
            return "[]";
        }

    }

    async deleteProjects(req, res) {
        console.log(req.params);
        if (req.params) {
            try {
                let _id = this.sanitizeString(String(req.params.id));
                let deletecard = await projectsSchemaModel.findByIdAndDelete(_id);
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

    async updateProjects(req, res) {
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.projecturl) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.projecturl !="") {
                let _id = this.sanitizeString(String(req.params.id));
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    projecturl: req.body.projecturl
                }
                try{
                    let update = await projectsSchemaModel.findByIdAndUpdate(_id, data);
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

    async postProjects(req, res) {
        console.log(req.body);
        if (req.body.imageurl && req.body.message && req.body.visibility && req.body.projecturl) {
            if (req.body.imageurl != "" && req.body.message != "" && req.body.visibility != "" && req.body.projecturl!="") {
                let data = {
                    imageurl: req.body.imageurl,
                    message: req.body.message,
                    visibility: Number.parseInt(req.body.visibility) == 1 ? true : false,
                    projecturl: req.body.projecturl
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
                res.status(204).send("no2");
            }
        }
        else {
            res.status(204).send("no1");
        }


    }


    async createNewCard(data) {
        try {
            let c1 = new projectsSchemaModel(
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





module.exports = Projects;