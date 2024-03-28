var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/campaign.controller')

router.route('/create').post(controller.create);
router.route('/list').get(controller.list);
router.route('/list/active').get(controller.listActive);
router.route('/launch/:id').get(controller.launch);

module.exports = router;
