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
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Tecnologie");
        var myInfo = { ID: req.body.ID };
        var newData = { $set: {Segnalazioni: { $push: { Data: new Date(), Descrizione: req.body.desc, Stato: null } } } };
        dbo.collection("Interventi118").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });
    });
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