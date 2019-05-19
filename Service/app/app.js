var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.post('/Segnala', function (req, res) {
    console.log("1");
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        var myInfo = { ID: parseInt(req.body.ID) };
        var newData = { $push: {Segnalazioni: { Data: new Date(), Descrizione: req.body.desc, Stato: null } } } ;
        dbo.collection("Mezzi").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send({n: result.result.n})
            db.close();
        });
    });
});



app.post('/NoleggiaMono', function (req, res) {
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        var myInfo = { ID: req.body.ID };
        var newData = { $set: { Stato: false } };
        dbo.collection("Mezzi").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });


    });
});


app.post('/BloccaMono', function (req, res) {
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        var myInfo = { ID: req.body.ID };
        var newData = { $set: { Stato: true } };
        dbo.collection("Mezzi").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });


    });
});

app.post('/PrenotaS', function (req, res) {

});



app.post('/PartecipaS', function (req, res) {
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        var myInfo = { Id: req.body.IdRichiesta };
        var newData = { $set: { IdPartecipante: req.body.IdUtente } };
        dbo.collection("Passaggi").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });


    });
});





// GET REQUESTS

app.get('/GetMezzi', function (req, res) {
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        dbo.collection("Mezzi").find({ Stato: true }, { _id: 0, Segnalazioni: 0, Credenziali: 0 }).sort({InterventoTipo:1}).toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
            db.close();
        });
    });
});



app.get('/GetOfferte', function (req, res) {
    MongoClient.connect('mongodb+srv://Admin:MMkj9Xy0HIEpBmz6@gianluca-0fshc.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("MonoOfficine");
        dbo.collection("Passaggi").find({ IdPartecipante: null }, { _id: 0, IdPartecipante: 0, IdProponente: 1, Id: 1, Percorso: 1, Data: 1 }).toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
            db.close();
        });
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});