var users = ["http://florida.flywheelsports.com/reserve/miami-beach",
             "http://florida.flywheelsports.com/reserve/boca",
             "http://new-york.flywheelsports.com/reserve/flatiron",
             "http://new-york.flywheelsports.com/reserve/jcc",
             "http://new-york.flywheelsports.com/reserve/upper-east-side",
             "http://new-york.flywheelsports.com/reserve/sag-harbor",
             "http://new-york.flywheelsports.com/reserve/east-hampton",
             "http://new-york.flywheelsports.com/reserve/millburn",
             "http://new-york.flywheelsports.com/reserve/stamford",
             "http://new-york.flywheelsports.com/reserve/englewood",
             "http://chicago.flywheelsports.com/reserve/gold-coast",
             "http://chicago.flywheelsports.com/reserve/highland-park",
             "http://seattle.flywheelsports.com/reserve/south-lake-union",
             "http://seattle.flywheelsports.com/reserve/bellevue",
             "http://texas.flywheelsports.com/reserve/highland-park",
             "http://texas.flywheelsports.com/reserve/plano",
             "http://los-angeles.flywheelsports.com/reserve/west-hollywood",
             "http://los-angeles.flywheelsports.com/reserve/larchmont",
             "http://philadelphia.flywheelsports.com/reserve/center-city",
             "http://dubai.flywheelsports.com/reserve/burj-views"];

var webpage = require('webpage');
var system  = require('system');

function follow(user, callback) {
    var page = webpage.create();
    page.open(user, function (status) {
        if (status === 'fail') {
            console.log(user + ': fail');
        } else {
            var data = page.evaluate(function () {
                var links = document.querySelectorAll('#schedule_classes a');
                var ret = [];
                for (var i = 0; i < links.length; i++) {
                    ret.push(links[i].href);
                }
                return ret;
            });
            for (var i = 0; i < data.length; i++) {
                console.log(user + '\t' + data[i]);
            }
        }
        page.close();

        if (callback) {
            callback();
        }
    });
}

function process() {
    if (users.length > 0) {
        var user = users.pop();
        follow(user, process);
    } else {
        phantom.exit();
    }
}

process();
