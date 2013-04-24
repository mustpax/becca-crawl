var webpage = require('webpage');
var system  = require('system');

var users = system.args.slice(1);

function follow(user, callback) {
    user = user + '/prev';
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
