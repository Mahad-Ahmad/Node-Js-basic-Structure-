var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/lead.controller')

router.route('/extract').post(controller.extractLeads);
router.route('/:id').get(controller.list);
router.route('/').delete(controller.delete);
router.route('/').patch(controller.update);


module.exports = router;
