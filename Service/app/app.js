var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.post('/Segnala', function (req, res) {

});



app.post('/NoleggiaMono', function (req, res) {

});



app.post('/PrenotaS', function (req, res) {

});



app.post('/PartecipaS', function (req, res) {

});





// GET REQUESTS

app.get('/GetMezzi', function (req, res) {

});



app.get('/GetOfferte', function (req, res) {

});