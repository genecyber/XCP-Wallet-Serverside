var express = require('express');
var app = express();
var xcp = require('./execMethod').Wallet

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('i am a beautiful butterfly');
});

/*app.post('/passphrase', function(req,res) {
    if (!req.body.hasOwnProperty('phrase')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    } else {
        xcp.setPassphrase(req.body.phrase, function(address){
            res.type('application/json')
            res.JSON({address: address})
        })
    }
})*/

app.get('/address', function(req,res) {
    xcp.getAddress(function(address){
        res.type('application/json')
        res.json({address: address})
    })
})

app.get('/foam.space/signup/:address',function(req,res){
    xcp.sendCoin(req.params.address, "FSCOIN", 1, function(out){
        res.type('application/json')
        res.json(out)
    })
})

app.get('/foam.space/signup/:address/:coin/:amount',function(req,res){
    xcp.sendCoin(req.params.address, req.params.coin, req.params.amount, function(out){
        res.type('application/json')
        res.json(out)
    })
})

app.get('/passphrase/:phrase', function(req,res) {
    var phrase = req.params.phrase
    xcp.setPhrase(phrase,function(address){
        res.type('application/json')
        res.json({address: address})
    })
})
console.log("Initialized ")
app.listen(process.env.PORT || 3008, process.env.HOST || 'localhost');