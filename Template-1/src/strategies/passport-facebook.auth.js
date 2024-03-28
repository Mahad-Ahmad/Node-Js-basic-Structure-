const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const facebookUser = require('../models/facebook.model');
require('dotenv').config();

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL:process.env.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {

        console.log('profile',profile)
        if(await facebookUser.findOne({profile_id:profile.id}))
        { 
            console.log('user already exists')
        } else{
            const fbuser=new facebookUser({user:profile,accessToken:accessToken})
            fbuser.save()
            done(null,fbuser)
        };
        
    } catch (error) {
        done(error,false,error.message)
    }
}));