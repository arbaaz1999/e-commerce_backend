const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user_schema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email_id: {
            type: String,
            required: true,
            unique: true,
        },
        mobile_no: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        pic: {
            type: String,
            default: "https://mui.com/static/images/avatar/2.jpg",
        },

    },
    {
        timestamps: true,
    }
);

user_schema.pre('save', async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error)
    }
})

/* user_schema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
} */

const User = mongoose.model('User', user_schema)

module.exports = User;