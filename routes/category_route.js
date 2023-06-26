const { add_category, get_all_categories } = require('../controllers/category_controller');
const { admin_auth } = require('../middlewares/auth_middleware')
const express = require('express');
const router = express.Router();

router.post('/add_category', admin_auth, add_category);
router.get('/', get_all_categories);



module.exports = router;