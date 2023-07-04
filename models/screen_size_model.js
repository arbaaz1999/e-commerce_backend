const mongoose = require('mongoose');

const screen_size_schema = mongoose.Schema({
    screen_size: {
        type: Number,
        required: true,
        unique: true,
    }
}, { timestamps: true });


const Screen_Size = mongoose.model('Screen_Size', screen_size_schema);

module.exports = Screen_Size;