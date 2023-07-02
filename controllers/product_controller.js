const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multer_s3 = require('multer-s3');
require('dotenv').config();
const async_handler = require('express-async-handler');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION
});

const upload = multer({
    storage: multer_s3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

const upload_product_images = async_handler(async (req, res) => {
    try {
        console.log('files found')
        const images = req.files.map(file => file.location)
        return res.status(200).send(images)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = { upload, upload_product_images }