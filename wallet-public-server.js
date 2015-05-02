var express = require('express');
var app = express();

app.use(express.static(__dirname + '/XCP-Wallet-Webapp/Chrome%20Extension/'));

app.get('/wallet', function(req,res,err){
    res.json({status:"success"})
})

app.listen(process.env.PORT || 3002);