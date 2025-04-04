const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gamepoints: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User ', GameSchema);
module.exports = UserModel;