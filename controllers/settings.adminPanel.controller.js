const InterpersonalSkills = require("./InterpersonalSkills.settings.adminPanel.controller");
const technicalSkills = require("./technicalSkills.settings.adminPanel.controller");
const projects = require("./projects.settings.adminPanel.controller");
const Experience = require("./experience.settings.adminPanel.controller");
const About = require("./about.settings.adminPanel.controller");
const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");


class AdminSettings{
    async getSettings(req, res){    
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

        let prodSl = 61;
        
        res.render("adminSettings", {gISdata, gTSdata, gPdata, gEdata, gAdata, gOSdata, prodSl});
    } 
}





module.exports = AdminSettings;