const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');


router.post('/permission', (req, res) => {
    console.log(req.body);
    res.send('received')
});


router.post('/add', async(req, res) => {
    try{
        const {
            rut,
            motivo,
            adress
        } = req.body;
        const permission = await Permission.create({rut, motivo, adress})
        return res.json(permission);   
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error in save a person");
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