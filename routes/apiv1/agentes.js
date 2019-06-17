"use strict";

var express = require('express');
var router = express.Router();
var mongose = require('mongoose');
var Agente = mongose.model('Agente');

//Recuperar lista de agentes
router.get('/',function(req, res, next){
    var name= req.query.name;
    var age= req.query.age;

    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || null;
    var fields = req.query.fields || null;
    var sort = req.query.sort || null;

    var filter = {};

    if(name){
        filter.name= name;
    }
    
    if(typeof age !== 'undefined') {
        filter.age= age;
    }

    Agente.list(filter, limit, skip, fields, sort, function(err,list){
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
router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Agente.remove({_id:id}, function(err, result){
        if(err){
            return next(err);
        }
        res.json({ok: true, result: result});
    });
});

module.exports = router;