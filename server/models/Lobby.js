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
            required: false,
        },
        maxsize: {
            type: Number,
            required: true,
        }
    }
)
const Lobby = model('Lobby', lobbySchema);
module.exports = Lobby;