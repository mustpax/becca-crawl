// List following and followers from several accounts

var users = ['PhantomJS',
        'ariyahidayat',
        'detronizator',
        'KDABQt',
        'lfranchi',
        'jonleighton',
        '_jamesmgreene',
        'Vitalliumm'];

function follow(user, callback) {
    var page = require('webpage').create();
    page.open('http://chicago.flywheelsports.com/reserve/gold-coast', function (status) {
        if (status === 'fail') {
            console.log(user + ': ?');
        } else {
            var data = page.evaluate(function () {
                return document.querySelectorAll('#schedule_classes a');
            });
            console.log(user + ': ' + data.length);
        }
        page.close();
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
