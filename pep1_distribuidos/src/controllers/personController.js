const express = require('express');
const router = express.Router();
const Person = require('../models/Person');




router.post('/add', async(req, res) => {
    const {
        firstname,
        email,
        rut,
        adress
    } = req.body;
    try{
        let person = await Person.create({firstname, email, rut, adress})
        if (person) {
            return res.status(200).json({
            ok: true,
             message: `Persona con rut: ${person.rut} agregada`,
            person: person
            })  
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error en agregar persona");
    }
});


router.get('/getall',async (req, res) => { 
    try{
        let person = await Person.findAll();
        if(person){
            res.json({
                data: person
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
    let person = await Person.findAll();
    if(person){
        res.json({
            data: person
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
        const person = await Person.findOne({_id: id});
        return res.json(person);
    }
    catch(err){
        res.status(500).json({
            message:"It couldn't get the person"
        })
    }
});

module.exports = router;