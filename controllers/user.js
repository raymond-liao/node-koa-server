/**
 * Created by raniys on 5/16/17.
 */

const config = require('../config/default.json');
const User = require('../services/user_mongo');

const userIndex = async (ctx, next) => {
    ctx.body = 'koa2 user';
};

const login = async (ctx, next) => {

};

const createUser = async (ctx, next) => {
    const requestData = ctx.request.body;
    const user = {
        provider: 'local',
        username: requestData.username
    };
    const newUser = await User.create(user);
    ctx.body = {
        data: newUser,
        success: true
    };
};

const updateUser = async (ctx, next) => {
    const requestData = ctx.request.body;
    const result = await User.update(JSON.parse(requestData.user));
    ctx.body = {
        success: result
    };
};

const logout = async (ctx, next) => {
    ctx.session.token = null;
    ctx.session.user = null;
    ctx.redirect('/');
};

module.exports = {
    userIndex,
    createUser,
    updateUser,
    login,
    logout
};