const mongoose = require("mongoose");

const screen_type_schema = mongoose.Schema({
    screen_type: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Screen_Type = mongoose.model('Screen_Type', screen_type_schema);

module.exports = Screen_Type;