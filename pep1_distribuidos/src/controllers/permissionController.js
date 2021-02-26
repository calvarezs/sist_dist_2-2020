const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');
const Person = require('../models/Person');
const { check, validationResult } = require('express-validator');
const { validate, clean, format } = require('rut.js')
const {PersonController} = require('./personController.js');
const transporter = require('../server');

router.post('/permission', (req, res) => {
    console.log(req.body);
    res.send('received')
});


async function add (myData) {
    const {
        firstname,
        email,
        rut,
        adress
    } = myData;
    try{
        let person = await Person.create({firstname, email, rut, adress})
        if (person) {
            console.log("SE HA CREADO UN USUARIOOO!!!!!!!!!!!!!!")
            return;
        }
    }
    catch(err){
        console.log(err);
        console.log("ERROR AL CREAR USUARIOOO!!!!!!!!!!!!!!")
        return;
    }
  }

router.post('/add', [
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
    async(req, res) => {
    try{
        const {
            rut,
            motivo,
            adress
        } = req.body;
        var myData = {
            firstname  : req.body.firstname,
            email : req.body.email,
            rut : req.body.rut,
            adress: req.body.adress
        };
        console.log("EL RUT A BUSCAR EEEEEEEEEEEEEEEEES!!!!!!!!!!! "+req.body.rut);


        
        const person = await Person.findOne({
            where: {
                rut
            }
        });
        console.log("LA PERSONA ES:")
        console.log(person)
        if(person==null){
            console.log("Se va a agregar una persona que no esta registrada!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            add(myData);
        }
        const permission = await Permission.create({rut, motivo, adress})
        if (permission) {
            //return res.json(permission); 

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

            res.render('cond', { title: 'Registration form' });
        }
        else{
            res.status(400).send("Error en agregar salvoconducto...");
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error in save a permission");
    }
});


router.get('/getall',async (req, res) => { 
    try{
        let permission = await Permission.findAll();
        if(permission){
            res.json({
                data: permission
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"It couldn't get any person"
    })
    }
  });

router.get('/',async (req, res) => { 
try{
    let permission = await Permission.findAll();
    if(permission){
        res.json({
            data: permission
        });
    }
}
catch(err){
    console.log(err);
    res.status(500).json({
        message:"Algo salio mal"
})
}
});


router.get('/get/:id',async (req, res) => { 
    var id = req.params.id;
    try{
        const permission = await Permission.findOne({_id: id});
        return res.json(permission);
    }
    catch(err){
        res.status(500).json({
            message:"It couldn't get the permission"
        })
    }
});

module.exports = router;
