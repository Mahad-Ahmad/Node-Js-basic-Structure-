var express = require("express");
var router = express.Router();
var userRoutes = require("./user.route");
var campaignRoutes = require("./campaign.route");
var authRoutes = require("./auth.route");
var configurationRoutes = require("./configuration.route");
var numberRoutes = require("./number.route");
var templateRoutes = require("./template.route");
var csvRoutes = require("./csv.route");
var csvExtractorRoutes = require("./lead.route");
var questionnaireRoutes = require("./questionnaire.route");
var conversationRoutes = require('./conversation.route')
//boilerplate
router.use('/conversation',conversationRoutes)
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/configuration", configurationRoutes);
router.use("/campaign", campaignRoutes);
router.use("/number", numberRoutes);
router.use("/template", templateRoutes);
router.use("/csv", csvRoutes);
router.use("/lead", csvExtractorRoutes);
router.use("/questionnaire", questionnaireRoutes);

module.exports = router;
