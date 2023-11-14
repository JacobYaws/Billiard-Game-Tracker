const { Schema, model } = require('mongoose');

const ballSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true
        },
        style: {
            type: String,
            required: true 
        },
        selected: {
            type: Boolean,
            required: true
        }
    }
)

const Ball = model('Ball', ballSchema);

module.exports = Ball;