var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/questionnaire.controller')


router.route('/list').get(controller.list);
router.route('/create').post(controller.create);
router.route('/').patch(controller.update);
router.route('/:id').delete(controller.delete);

module.exports = router;
