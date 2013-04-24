var system  = require('system');
var users = system.args.slice(1);

function follow(user, callback) {
    var page = require('webpage').create();
    page.open(user, function (status) {
        if (status === 'fail') {
            console.log(user + ': ?');
        } else {
            var count = page.evaluate(function () {
                return document.querySelectorAll('.reserved').length - 1;
            });

            var time = page.evaluate(function () {
                return document.querySelectorAll('.reserve_main_table td')[2].innerText +
                       ' ' +
                       document.querySelectorAll('.reserve_main_table td')[3].innerText;
            });

            var loc = page.evaluate(function () {
                return document.querySelectorAll('.reserve_main_table td')[4].innerText;
            });
            console.log([user, loc, time, count].join('\t'));
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
        'value':    'jibviudm3qfjf5b175ss152un7',
        'domain':   '.flywheelsports.com'
    });

    if (users.length > 0) {
        var user = users.pop();
        follow(user, process);
    } else {
        phantom.exit();
    }
}

process();
