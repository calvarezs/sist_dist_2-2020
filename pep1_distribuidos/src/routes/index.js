const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validate, clean, format } = require('rut.js')
const personController = require('../controllers/personController');
const permissionController = require('../controllers/permissionController');
const Person = require('../models/Person');

router.get('/', (req, res) => {
	res.render('form', { title: 'Registration form' });
});

router.post('/', 
 	[
	    check('rut')
	    	.custom(rut => validate(rut))
	    	.withMessage('Rut inválido o incorrecto'),
	    check('firstname')
	    	.not().isEmpty()
	      	.withMessage('Por favor ingrese su nombre completo'),
	    check('adress')
	    	.not().isEmpty()
	      	.withMessage('Por favor ingrese una dirección de domicilio válida'),
	    check('motivo')
	    	.not().isEmpty()
	      	.withMessage('Por favor ingrese el motivo de salida'),
	    check('email')
	    	.isEmail()
    		.normalizeEmail() 
	      	.withMessage('Por favor ingrese un correo válido'),
	],
  	(req, res) => {
    	const errors = validationResult(req);

    	if (errors.isEmpty()) {
			console.log(req.body.rut,req.body.firstname);
      		res.send('Se ha enviado el formulario. El resultado se mostrará en breve.');
    	} else {
    		console.log(errors);
      		res.render('form', {
        		title: 'Registration form',
        		errors: errors.array(),
        		data: req.body,
      		});
    	}
  	}
);



router.use('/persons', personController);
router.use('/permissions', permissionController);





module.exports = router;
