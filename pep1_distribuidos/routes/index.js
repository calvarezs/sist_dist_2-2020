const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
	res.render('form', { title: 'Registration form' });
});

router.post('/', 
 	[
	    check('name')
	      	.isLength({ min: 1 })
	      	.withMessage('Por favor ingrese su nombre completo'),
	    check('email')
	      	.isLength({ min: 1 })
	      	.withMessage('Por favor ingrese un correo válido'),
	],
  	(req, res) => {
    	const errors = validationResult(req);

    	if (errors.isEmpty()) {
      		res.send('Se ha enviado el formulario. El resultado se mostrará en breve.');
    	} else {
      		res.render('form', {
        		title: 'Registration form',
        		errors: errors.array(),
        		data: req.body,
      		});
    	}
  	}
);


module.exports = router;
