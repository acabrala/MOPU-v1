"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportFacebook = require("passport-facebook-token");
const passportGoogle = require("passport-google-token");
const passportTwitter = require("passport-twitter-token");
const passportAnonymous = require("passport-anonymous");
const User_1 = require("../model/User");
const GoogleStrategy = passportGoogle.Strategy;
function initializeFacebookStrategy(passport) {
    passport.use(new passportFacebook({
        clientID: "281409546125461",
        clientSecret: 'b3dd51e4bac138b80017ad6cb11c64e9',
        profileFields: ['id', 'displayName', 'gender', 'photos', 'email'],
        enableProof: false
    }, (accessToken, refreshToken, profile, done) => {
        try {
            let userEmail = profile.emails[0].value;
            if (userEmail === 'undefined' || !userEmail) {
                userEmail = null;
            }
            var user = {
                id_user: profile.id,
                nome: profile.displayName,
                email: userEmail
            };
            User_1.User.findByPk(profile.id)
                .then(usuario => {
                if (usuario) {
                    return done(null, user);
                }
                user['is_facebook'] = true;
                return done(null, user);
            }).catch(error => {
                done(error, null);
            });
        }
        catch (e) {
            done(e, null);
        }
    }));
}
exports.initializeFacebookStrategy = initializeFacebookStrategy;
function initializeAnonymousStrategy(passport) {
    passport.use(new passportAnonymous());
}
exports.initializeAnonymousStrategy = initializeAnonymousStrategy;
function initializeGoogleStrategy(passport) {
    passport.use(new GoogleStrategy({
        clientID: "531571128532-rjts9augke49b8475bjp549ot3gjcthi.apps.googleusercontent.com",
        clientSecret: "bMALXFIt_JqwVru75X8bSivD"
    }, (accessToken, refreshToken, profile, done) => {
        try {
            let user = {
                id_user: profile.id,
                nome: profile.displayName,
                email: profile.emails[0].value
            };
            User_1.User.findByPk(profile.id)
                .then(usuario => {
                if (usuario) {
                    return done(null, user);
                }
                user['is_google'] = true;
                console.log(user);
                return done(null, user);
            }).catch(err => {
                console.log(err);
                done(err, null);
            });
        }
        catch (e) {
            console.log(e);
            done(e, null);
        }
    }));
}
exports.initializeGoogleStrategy = initializeGoogleStrategy;
function initializeTwitterStrategy(passport) {
    passport.use(new passportTwitter({
        consumerKey: 'x5pMkNjffN0VezjNlI644un0y',
        consumerSecret: 'Quydz6eO8etyHnyY1wrBHPbdvDIgT1CzAEwLaP5UyQu70qKZx1',
    }, (token, tokenSecret, profile, done) => {
        try {
            let user = {
                id_user: profile.id,
                nome: profile.displayName,
                email: profile.emails[0].value
            };
            User_1.User.findById(profile.id)
                .then(usuario => {
                if (usuario) {
                    return done(null, user);
                }
                user['is_twitter'] = true;
                return done(null, user);
            }).catch(err => {
                console.log(err);
                done(err, null);
            });
        }
        catch (e) {
            console.log(e);
            done(e, null);
        }
    }));
}
exports.initializeTwitterStrategy = initializeTwitterStrategy;
