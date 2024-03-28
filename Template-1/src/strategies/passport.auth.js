const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const path = require('path')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }); //get env file based on script NODE_ENV==="cross-env" in package.json

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Invalid Password or Email' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Invalid Password or Email' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey:process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );