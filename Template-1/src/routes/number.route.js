var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin/number.controller')
/* GET users listing. */
router.get('/list',controller.getAllNumbers);
router.get('/:id',controller.getNumber);

module.exports = router;
