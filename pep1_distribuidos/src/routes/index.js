const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validate, clean, format } = require('rut.js')
const personController = require('../controllers/personController');
const permissionController = require('../controllers/permissionController');
const Person = require('../models/Person');
const Permission = require('../models/Permission');
const transporter = require('../../server');

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
			//save person
			var myData = {
				firstname  : req.body.firstname,
				email : req.body.email,
				rut : req.body.rut,
				adress: req.body.adress
			};
			console.log(myData);
			
			try{
				//save person
				const person = new Person(req.body);
				person.save()
				//res.send('Thank you for your registration! (Person)'); 
				//save permission
				var myData = {
					rut : req.body.rut,
					motivo : req.body.motivo,
					adress: req.body.adress
				};
				console.log(myData);
				const permission = new Permission(req.body);
				permission.save()
				res.send('Permiso solicitado, revise su correo!');

				transporter.sendMail({
				from: 'nreply.confrmat1on@gmail.com',
				to: req.body.email,
				subject: 'Entrega de Permiso temporal',
				text: 
				'Sr. (a) '+req.body.firstname+': \n'+
				'Por este medio confirmamos que su Permiso Temporal fue generado con éxito. \n'+
				'A continuación una copia de su Permiso: \n'+
				'Dirección: '+req.body.adress+'\n'+
				'Motivo: '+req.body.motivo+'\n'+
				'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- \n'+
				'ESTE PERMISO ES VÁLIDO DESPUÉS DE 30 MINUTOS.\n'+
				'Atentamente, \n'+
				'Carabineros de Chile.'
				
				
				},function(err, data){
					if(err){
						console.log('Error Occurs');
						console.log(err);
					} else{
						console.log('Email sent!!!!');
					}
				});


			}catch(er){
				res.send('Lo sentimos! Algo fue mal con el registro.'); 
				console.log(er);
			}			
      		//res.send('Se ha enviado el formulario. El resultado se mostrará en breve.');
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
