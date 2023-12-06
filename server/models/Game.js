const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
       users: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    ],
        balls: [{
            type: Object,
            ref:'ball',
            required: true,
        },
    ],
        gametype: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    }
)
const Game = model('Game', gameSchema);
module.exports = Game;