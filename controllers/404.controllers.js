const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");

class PageNotFound{
    async getHome(req, res){
            let getotherSettings = new otherSettings();
            let gOSdata = await getotherSettings.getotherSettings();  
            res.render("404", {gOSdata});
    }
}



module.exports = PageNotFound;