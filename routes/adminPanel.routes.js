const express = require("express");
const router = new express.Router();
const adminPanel = require("../controllers/adminPanel.controller");
const adminSettings = require("../controllers/settings.adminPanel.controller");
const Uploader = require("../controllers/uploader.settings.adminPanel.controller");
const InterpersonalSkills = require("../controllers/InterpersonalSkills.settings.adminPanel.controller");
const technicalSkills = require("../controllers/technicalSkills.settings.adminPanel.controller");
const Projects = require("../controllers/projects.settings.adminPanel.controller");
const Experience = require("../controllers/experience.settings.adminPanel.controller");
const About = require("../controllers/about.settings.adminPanel.controller");
const Forms = require("../controllers/forms.adminPanel.controller");
const contactForm = require("../controllers/contactForm.forms.adminPanel.controller");
const otherSettings = require("../controllers/otherSettings.settings.adminPanel.controller");

// routes and controller
let adminPanelController = new adminPanel();
router.get("/", adminPanelController.getHome.bind(adminPanelController));


// forms

let FormsController = new Forms();
router.get("/forms", FormsController.getForms.bind(FormsController));


let contactFormControllers = new contactForm();

router.get("/forms/contact/:id", contactFormControllers.deleteContactForm.bind(contactFormControllers));


// admin settting

let adminSettingsController = new adminSettings();
router.get("/settings", adminSettingsController.getSettings.bind(adminSettingsController));


let InterpersonalSkillsController = new InterpersonalSkills();
router.get("/settings/interpersonalSkills/:id", InterpersonalSkillsController.deleteInterpersonalSkills.bind(InterpersonalSkillsController));
router.post("/settings/interpersonalSkills", InterpersonalSkillsController.postInterpersonalSkills.bind(InterpersonalSkillsController));
router.post("/settings/interpersonalSkills/:id", InterpersonalSkillsController.updateInterpersonalSkills.bind(InterpersonalSkillsController));

let technicalSkillsController = new technicalSkills();
router.get("/settings/technicalSkills/:id", technicalSkillsController.deleteTechnicalSkills.bind(technicalSkillsController));
router.post("/settings/technicalSkills", technicalSkillsController.postTechnicalSkills.bind(technicalSkillsController));
router.post("/settings/technicalSkills/:id", technicalSkillsController.updateTechnicalSkills.bind(technicalSkillsController));


let projectsController = new Projects();
router.get("/settings/projects/:id", projectsController.deleteProjects.bind(projectsController));
router.post("/settings/projects", projectsController.postProjects.bind(projectsController));
router.post("/settings/projects/:id", projectsController.updateProjects.bind(projectsController));


let ExperienceController = new Experience();
router.get("/settings/experience/:id", ExperienceController.deleteExperience.bind(ExperienceController));
router.post("/settings/experience", ExperienceController.postExperience.bind(ExperienceController));
router.post("/settings/experience/:id", ExperienceController.updateExperience.bind(ExperienceController));

let AboutController = new About();
router.get("/settings/about/:id", AboutController.deleteAbout.bind(AboutController));
router.post("/settings/about", AboutController.postAbout.bind(AboutController));
router.post("/settings/about/:id", AboutController.updateAbout.bind(AboutController));

let otherSettingsController = new otherSettings();
router.get("/settings/othersettings/:id", otherSettingsController.deleteotherSettings.bind(otherSettingsController));
router.post("/settings/othersettings", otherSettingsController.postotherSettings.bind(otherSettingsController));
router.post("/settings/othersettings/:id", otherSettingsController.updateotherSettings.bind(otherSettingsController));




let uploaderController = new Uploader();

router.get("/settings/uploader", uploaderController.sendImageList.bind(uploaderController));
router.delete("/settings/uploader/:id", uploaderController.deleteImage.bind(uploaderController));
router.post("/settings/uploader", uploaderController.UploadImage.bind(uploaderController));

module.exports = router;