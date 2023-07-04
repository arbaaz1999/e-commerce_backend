const { add_screen_size, get_all_screen_sizes } = require('../controllers/screen_size_controller');
const { admin_auth } = require('../middlewares/auth_middleware');
const express = require('express');
const router = express.Router();

router.post('/add_screen_size', admin_auth, add_screen_size);
router.get('/', get_all_screen_sizes);

module.exports = router;