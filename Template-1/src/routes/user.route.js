var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/user.controller')
const { uploadSingle } = require('../middleware/multer');


//validation middlewares
const { userValidationRules, validate } = require('../validations/validator')
/* GET users listing. */
router.route('/create').post(userValidationRules(), validate, controller.create);
router.route('/:id').get(controller.getProfile);
router.route('/editProfile').put(controller.editProfile)
router.route('/uploadImage').put(uploadSingle,controller.imageUpload)


module.exports = router;
