const Screen_Size = require('../models/screen_size_model');
const async_handler = require('express-async-handler');

const add_screen_size = async_handler(async (req, res) => {
    try {
        const { screen_size } = req.body;
        const check = await Screen_Size.findOne({ screen_size: screen_size });
        if (check) {
            return res.status(403).json({
                message: `Screen-size ${check.screen_size} is already exist`
            })
        }
        if (screen_size) {
            const new_screen_size = await Screen_Size.create({ screen_size })
            return res.status(200).json({
                message: `${new_screen_size.screen_size} size created successfully`,
                data: screen_size,
                error: null
            })
        } else {
            return res.status(403).json({
                message: `Can not create ${screen_size} Size!`
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})


const get_all_screen_sizes = async_handler(async (req, res) => {
    try {
        const all_screen_sizes = await Screen_Size.find({}).sort({ "screen_size": 1 })
        if (all_screen_sizes.length > 0) {
            return res.status(200).json({
                message: 'Screen Sizes fetched successfully',
                data: all_screen_sizes,
                error: null
            })
        } else {
            return res.status(404).json({
                message: "Not Found!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error!",
            error: error.message
        })
    }
})



module.exports = { add_screen_size, get_all_screen_sizes };
