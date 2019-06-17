"use strict";

var express = require('express');
var router = express.Router();
var mongose = require('mongoose');
var Agente = mongose.model('Agente');

router.get('/',function(req, res, next){
    Agente.find().exec(function(err,list){
        if (err){
            next(err);
            return;
        }

        res.json({ok: true, list: list});
    });
});

module.exports = router;