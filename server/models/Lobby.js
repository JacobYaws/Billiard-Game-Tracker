const { Schema, model } = require('mongoose');

const lobbySchema = new Schema(
    {
       users: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    ],
        gametype: {
            type: String,
            required: true,
        },
        maxsize: {
            type: Number,
            required: true,
        }
    }
)
const Lobby = model('Lobby', gameSchema);
module.exports = Lobby;