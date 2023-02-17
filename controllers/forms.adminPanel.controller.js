const contactForm = require("./contactForm.forms.adminPanel.controller");

class Forms{
    async getForms(req, res){    
        let getContactForm = new contactForm();
        let cData = await getContactForm.getContactForm();
        console.log(cData);
        res.render("adminForms", {cData});
    } 
}

module.exports = Forms;