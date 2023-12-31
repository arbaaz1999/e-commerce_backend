const { upload, upload_product_images, add_product, get_all_products } = require('../controllers/product_controller');
const { admin_auth } = require('../middlewares/auth_middleware');
const express = require('express');
const router = express.Router();

router.post('/product_images', admin_auth, upload.array('product_images', 5), upload_product_images);
router.post('/add_product', admin_auth, add_product);
router.get('/', get_all_products)

module.exports = router;