var users = ['http://chicago.flywheelsports.com/class/36354'];

function follow(user, callback) {
    var page = require('webpage').create();
    page.open(user, function (status) {
        if (status === 'fail') {
            console.log(user + ': ?');
        } else {
            var data = page.evaluate(function () {
                return document.querySelectorAll('.reserved').length - 1;
            });
            console.log(user + ' : ' + data);
        }
        page.close();

        if (callback) {
            callback();
        }
    });
}

function process() {
    phantom.addCookie({
        'name':     'SESS0503627fa9caee1704074bff31525611',
        'value':    '2521fe797adf8ef2f485fc57a8ec11f4',
        'domain':   '.flywheelsports.com'
    });

    if (users.length > 0) {
        var user = users[0];
        users.splice(0, 1);
        follow(user, process);
    } else {
        phantom.exit();
    }
}

process();
