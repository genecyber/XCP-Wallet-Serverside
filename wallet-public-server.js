var express = require('express');
var app = express();

app.use(express.static(__dirname + '/site'));

app.get('/XCP-Wallet-Webapp/Chrome%20Extension/', function(req,res,err){
    res.json({status:"success"})
})

app.listen(process.env.PORT || 3001);