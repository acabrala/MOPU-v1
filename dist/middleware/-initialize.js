"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("./-index");
const User_1 = require("../model/User");
function initializeStrategies(passport) {
    passport.serializeUser((user, done) => done(null, user.id_user));
    passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        return yield User_1.User
            .findByPk(id)
            .then(account => done(null, account))
            .catch(err => done(err));
    }));
    _index_1.Strategy.initializeFacebookStrategy(passport);
    _index_1.Strategy.initializeGoogleStrategy(passport);
    _index_1.Strategy.initializeTwitterStrategy(passport);
    _index_1.Strategy.initializeAnonymousStrategy(passport);
}
exports.initializeStrategies = initializeStrategies;
