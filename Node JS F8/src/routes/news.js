const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewController');
// newController.index
router.get('/tin', newController.index);
router.get('/tintuc', newController.tintuc);
router.get('/', (req, res) => res.send('trang new'));

module.exports = router;
