const { Schema, model } = require('mongoose');
const {v4: uuidv4} = require('uuid');
const {userSchema} = require('./User');

const onlineGameSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            default: function genUUID() {
                return uuidv4();
            }
        },
        boards: [{
            board_id: Number,
            board: [Boolean],
            complete: Boolean
        }],
        playerOneNext: {
            type: Boolean,
            default: false
        },
        playerOne: String,
        playerTwo: String
    },
    {timestamps: true}
);

const OnlineGame = model('OnlineGame', onlineGameSchema);

module.exports = OnlineGame;