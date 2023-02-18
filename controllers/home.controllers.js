const InterpersonalSkills = require("./InterpersonalSkills.settings.adminPanel.controller");
const technicalSkills = require("./technicalSkills.settings.adminPanel.controller");
const projects = require("./projects.settings.adminPanel.controller");
const Experience = require("./experience.settings.adminPanel.controller");
const About = require("./about.settings.adminPanel.controller");
const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");

class Home{
    async getView(req, res){
        let getInterpersonalSkills = new InterpersonalSkills();
        const gISdata = await getInterpersonalSkills.getInterpersonalSkills();

        let getTechnicalSkills = new technicalSkills();
        let gTSdata = await getTechnicalSkills.getTechnicalSkills();


        let getprojects = new projects();
        let gPdata = await getprojects.getProjects();

        let getExperience = new Experience();
        let gEdata = await getExperience.getExperience();

        let getAbout = new About();
        let gAdata = await getAbout.getAbout();

        let getotherSettings = new otherSettings();
        let gOSdata = await getotherSettings.getotherSettings();
        
        res.render("home", {gISdata, gTSdata, gPdata, edata:gEdata, gAdata, gOSdata});
    }
    async postHome(req, res){
        res.redirect("/*");
    }
}



module.exports = Home;