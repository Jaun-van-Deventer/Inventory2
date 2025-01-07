const express = require('express');
const { getItems, createItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);

// Add more routes for update and delete as needed

module.exports = router;