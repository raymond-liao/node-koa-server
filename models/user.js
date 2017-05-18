/**
 * Created by raniys on 5/16/17.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true },
    provider: { type: String },
    auth_token: { type: String },
    avatar: { type: String },
    facebook: {},
    twitter: {},
    wechat: {},
    github: {},
    google: {},
    linkedin: {}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
});

UserSchema.index({content: 1});

module.exports = {
    User: mongoose.model('user', UserSchema)
};