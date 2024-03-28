// __ __ __ Routes has __ __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

var express = require('express');
var router = express.Router();
var controller = require('../../src/controllers/admin/conversation.controller')

router.route('/campaign/:id').get(controller.campaignConversation);
router.route('/lead').get(controller.leadConversation);
router.route('/recieve').post(controller.store);


module.exports = router;
