const Category = require('../models/category_model');
const async_handler = require('express-async-handler');

const add_category = async_handler(async (req, res) => {
    try {
        const { category_name } = req.body;
        const check = await Category.findOne({ category_name: { "$regex": category_name, "$options": "i" } });
        if (check) {
            return res.status(403).json({
                message: `Category ${check.category_name} is already exist`
            })
        }
        if (category_name) {
            const new_category = await Category.create({ category_name })
            return res.status(200).json({
                message: `${new_category.category_name} category created successfully`,
                data: new_category,
                error: null
            })
        } else {
            return res.status(403).json({
                message: `Can not create ${category_name} Category!`
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


const get_all_categories = async_handler(async (req, res) => {
    try {
        const all_categories = await Category.find({})
        if (all_categories.length > 0) {
            return res.status(200).json({
                message: 'Categories fetched successfully',
                data: all_categories,
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



module.exports = { add_category, get_all_categories };
