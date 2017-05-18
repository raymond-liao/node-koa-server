const Model = require('../models/mongo/index');

const getUser = (username, options) => {
    let query = {username: username};
    Object.keys(options).forEach((key) => {
        query[key] = options[key];
    });
    return new Promise((resolve, reject) => {
        Model.User
            .find(query)
            .sort('-updated_at')
            .exec().then((result) => {
            resolve(result);
        });
    });
};

const create = (options) => {
    return new Promise((resolve, reject) => {
        Model.User.create(options).then((result) => {
            resolve(result);
        });
    });
};

const update = (user) => {
    return new Promise((resolve, reject) => {
        const {_id} = user;
        delete user._id;
        Model.User.update({_id: _id}, user).then((result) => {
            resolve(true);
        }).catch((err) => {
            resolve(false);
        });
    });
};

module.exports = {
    getUser,
    create,
    update
};
