const { admin_auth } = require('../middlewares/auth_middleware')
const { add_sub_category, get_all_sub_categories } = require('../controllers/sub_category_controller')
const express = require('express');
const router = express.Router();


router.post('/add_sub_category', admin_auth, add_sub_category);
router.get('/', get_all_sub_categories);

module.exports = router;