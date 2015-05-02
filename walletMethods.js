var page = require('webpage').create();
var system = require('system');
var args = system.args

var method = args[1]
args.splice(0, 2);


page.open('http://cheese-robert.codio.io:3001/wallet2/#', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network')
  } else {
      performAction(method)
    }
})


page.onConsoleMessage = function(msg) {
        if (msg.indexOf('"status" : "success"') > -1) {
            var data = JSON.parse(msg)
            var id = data.data.txid
            console.log(JSON.stringify({txid: id}))
            page.render("../transactions/"+id+'-send.png')
            phantom.exit()
        }
}

function performAction(method){
    switch(method) {
            case "sendCoin" :
                sendCoin(args[0],args[1],args[2]);
                break
            case "setPhrase" :
                console.log("switch " + args[0])
                setPhrase(args[0])
    }
}

function setPhrase(phrase){
    return page.evaluate(Function('var old = $("option:nth(0)").attr("label"); $("a[href=\'#settingsPage\']").click();$("#manualPassphrase").click();$("#manualMnemonic").val("'+phrase+'");$("#manualAddressButton").click();return {old: old, new: $("option:nth(0)").attr("label")}'))
}

function sendCoin(address, coin, amount){
    return page.evaluate(Function("sendCoin('"+coin+"','"+address+"',"+amount+")"))
}



