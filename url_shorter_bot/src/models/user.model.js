const { Schema, model } = require("mongoose");

const scheme = new Schema ({
    telegramId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = model('user',scheme)