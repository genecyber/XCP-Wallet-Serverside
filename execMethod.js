var Wallet = {}
var spawn = require('child_process').spawn;
var prc


Wallet.sendCoin = function(address, coin, amount, cb){
    console.log(address)
    prc = spawn('phantomjs',  ['walletMethods.js', "sendCoin", address, coin, amount]);

    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        var returnObj = JSON.parse(lines[0])
        returnObj.address = address
        returnObj.amount = amount
        returnObj.asset=coin
        console.log(lines[0])
        return cb(returnObj)
    })
}

Wallet.setPhrase = function(phrase, cb){
    console.log(phrase)
    prc = spawn('phantomjs',  ['walletMethods.js',  'setPhrase', phrase]);

    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        var returnObj = lines[0]
        //returnObj.address = address
        //returnObj.amount = amount
        //returnObj.asset=coin
        console.log(lines)
        return cb(returnObj)
    })
}

exports.Wallet = Wallet