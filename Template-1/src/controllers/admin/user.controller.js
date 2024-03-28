const User = require('../../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Types;
/**
 * Create a fresh user into the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */


exports.create = async (req, res, next) => {
   try {
      const user = await new User(req.body)
      user.save()
      res.status(200).send({
         message: "user created",
         data: user
      })
   } catch (error) {
      next(error)
   }
}

exports.getProfile = async (req, res, next) => {
   try {
      let { id } = req.params;
      const userData = await User.findById(ObjectId(id), { firstname: 1, lastname: 1, email: 1, _id: 1, profileImage: 1 });
      console.log(userData)
      if (!userData) {
         throw new Error("campaign not found");
      }
      return res.send({
         success: true,
         message: "Profile retrieved successfully",
         userData,

      });
   } catch (error) {
      next(error);
   }
};

exports.editProfile = async (req, res, next) => {

   try {
      let id = req?.body?._id;
      let password;
      let userData;

      // if (req.file) {
      // 	//	const image = req.files.profileImage[0];
      // 	// payload.profileImage = `/${image.path}`;
      // 	payload.profileImage = `/${req.file.originalname}`;
      // }
      let email = "admin@fcb.com"
      if (req?.body?.password) {
         const hash = await bcrypt?.hash(req?.body?.password, 10);
         password = hash;
         userData = await User.findByIdAndUpdate(id, { firstname: req.body.firstname, lastname: req.body.lastname, password: password });
      }
      else {
         userData = await User.findByIdAndUpdate(id, { firstname: req.body.firstname, lastname: req.body.lastname});
      }

      if (!userData) {
         throw new Error("Something went wrong");
      }

      return res.send({
         success: true,
         message: "Profile Updated!",
         // userData,
      });
   } catch (error) {
      next(error);
   }
};

exports.imageUpload = async (req, res, next) => {

   try {
      let { filename } = req.file;
      let { id } = req.body;
      let user = await User.findByIdAndUpdate(id, { profileImage: filename }, { new: true })
      if (!user) {
         throw new Error("Something went wrong");
      }

      if (user) {
         return res.status(200).send({
            success: true,
            message: "Updated Successfully",
         })
      }

      if (!userData) {
         throw new Error("Something went wrong");
      }

      return res.send({
         success: true,
         message: "Profile Updated!",
         userData,
      });
   } catch (error) {
      next(error);
   }
};