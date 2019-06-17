"use strict";

var mongoose = require('mongoose');

var agenteShema = mongoose.Schema({
    name: String,
    age: Number
});

mongoose.model('Agente',agenteShema);
