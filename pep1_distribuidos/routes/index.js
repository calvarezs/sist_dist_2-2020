const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validate, clean, format } = require('rut.js')


router.get('/', (req, res) => {
	res.render('form', { title: 'Registration form' });
});

router.post('/', 
 	[
	    check('rut')
	    	.custom(rut => validate(rut))
	    	.withMessage('Rut inválido o incorrecto'),
	    check('nombre')
	    	.not().isEmpty()
	      	.withMessage('Por favor ingrese su nombre completo'),
	    check('direccion')
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


module.exports = router;
