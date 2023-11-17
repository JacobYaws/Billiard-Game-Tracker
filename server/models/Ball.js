const { Schema, model } = require('mongoose');

const ballSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
            // unique: true
        },
        type: {
            type: String,
            required: true 
        },
        status: {
            type: Boolean,
            required: true
        },
        assigneduser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        color: {
            type: String,
            required: false,
        },
    }
)

const Ball = model('Ball', ballSchema);

module.exports = Ball;