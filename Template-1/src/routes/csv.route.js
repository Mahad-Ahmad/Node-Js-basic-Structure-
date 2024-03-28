var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/csv.controller')
const {csvUpload} = require('../utils/csvUpload')
router.route('/upload').post(csvUpload,controller.upload);
router.route('/list').get(controller.list);
router.route('/headers').post(controller.csvHeaders);

module.exports = router;
