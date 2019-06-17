"use strict";

var express = require('express');
var router = express.Router();
var mongose = require('mongoose');
var Agente = mongose.model('Agente');

//Recuperar lista de agentes
router.get('/',function(req, res, next){
    Agente.find().exec(function(err,list){
        if (err){
            next(err);
            return;
        }

        res.json({ok: true, list: list});
    });
});

//Crear un agente
router.post('/', function(req, res, next){
    var agente = new Agente(req.body);

    agente.save(function(err, agenteGuardado){
        if(err){
            return next(err);
        }
        res.json({ok: true, agente: agenteGuardado});
    });

});

//Actualizar un agente
router.put('/:id', function(req, res, next){
    var id = req.params.id;
    Agente.update({_id: id}, req.body, function(err, agente){
        if(err){
            return next(err);
        }
        res.json({ok: true, agente: agente});
    });
});

//Borrar un agente

module.exports = router;