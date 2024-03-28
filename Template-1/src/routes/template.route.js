var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/template.controller')
/* GET users listing. */
router.route('/list').get(controller.getAllTemplates);
router.route('/create').post(controller.createTemplate);
router.route('/:id').get(controller.getTemplate);
router.route('/:id').delete(controller.deleteTemplate);

module.exports = router;
