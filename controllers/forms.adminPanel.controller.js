const contactForm = require("./contactForm.forms.adminPanel.controller");
const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");

class Forms{
    async getForms(req, res){    
        let getContactForm = new contactForm();
        let cData = await getContactForm.getContactForm();
        console.log(cData);

        let getotherSettings = new otherSettings();
        let gOSdata = await getotherSettings.getotherSettings();  
        console.log("::"+gOSdata);

        res.render("adminForms", {cData, gOSdata});
    } 
}

module.exports = Forms;