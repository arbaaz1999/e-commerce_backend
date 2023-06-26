const express = require('express');
const { add_brand, get_all_brands } = require('../controllers/brand_controller');
const { admin_auth } = require('../middlewares/auth_middleware');
const router = express.Router();

router.post('/add_brand', admin_auth, add_brand);
router.get('/', get_all_brands)

module.exports = router;