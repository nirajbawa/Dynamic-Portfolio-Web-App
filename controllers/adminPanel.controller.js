const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");

class adminPanel{
    async getHome(req, res){  
        let getotherSettings = new otherSettings();
        let gOSdata = await getotherSettings.getotherSettings();  
        res.render("adminPanel", {gOSdata});
    } 
}



module.exports = adminPanel;