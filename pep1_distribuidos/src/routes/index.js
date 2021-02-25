const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const permissionController = require('../controllers/permissionController');


router.use('/persons', personController);
router.use('/permissions', permissionController);


router.get('/', (req, res) => {
	res.render('form', { title: 'Registration form' });
});







module.exports = router;

