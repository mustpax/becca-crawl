var users = ['gold-coast'];

function follow(user, callback) {
    var page = require('webpage').create();
    page.open('http://chicago.flywheelsports.com/reserve/' + user, function (status) {
        if (status === 'fail') {
            console.log(user + ': ?');
        } else {
            var data = page.evaluate(function () {
                var links = document.querySelectorAll('#schedule_classes a');
                var ret = [];
                for (var i = 0; i < links.length; i++) {
                    ret.push(links[i].href);
                }
                return ret;
            });
            console.log(user + ': ' + data.length);
            console.log(user + ': ' + data[0]);
            console.log(user + ': ' + data[1]);
        }
        page.close();

        if (callback) {
            callback();
        }
    });
}

function process() {
    if (users.length > 0) {
        var user = users[0];
        users.splice(0, 1);
        follow(user, process);
    } else {
        phantom.exit();
    }
}

process();
