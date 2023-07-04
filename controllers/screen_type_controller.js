const Screen_Type = require('../models/screen_type_model');
const async_handler = require('express-async-handler');

const add_screen_type = async_handler(async (req, res) => {
    try {
        const { screen_type } = req.body;
        const check = await Screen_Type.findOne({ screen_type: { "$regex": screen_type, "$options": "i" } });
        if (check) {
            return res.status(403).json({
                message: `Screen-type ${check.screen_type} is already exist`
            })
        }
        if (screen_type) {
            const new_screen_type = await Screen_Type.create({ screen_type })
            return res.status(200).json({
                message: `${new_screen_type.screen_type} screen-type created successfully`,
                data: new_screen_type,
                error: null
            })
        } else {
            return res.status(403).json({
                message: `Can not create ${screen_type} Screen-type!`
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


const get_all_screen_types = async_handler(async (req, res) => {
    try {
        const all_screen_types = await Screen_Type.find({}).sort({ "createdAt": -1 })
        if (all_screen_types.length > 0) {
            return res.status(200).json({
                message: 'Screen-types fetched successfully',
                data: all_screen_types,
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



module.exports = { add_screen_type, get_all_screen_types };
