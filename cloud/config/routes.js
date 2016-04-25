// Models

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendfile('./web/views/index.html');
    });

    app.get('/get-blessed', function(req, res) {
        res.sendfile('./web/views/login.html');
    });

    app.get('/become-a-blesser', function(req, res) {
        res.sendfile('./web/views/register.html');
    });

    app.get('/messages', function(req, res) {
        res.sendfile('./web/views/messages.html');
    });

    app.get('/about', function(req, res) {
        res.sendfile('./web/views/about.html');
    });

    app.get('/advertising', function(req, res) {
        res.sendfile('./web/views/advertising.html');
    });

    app.get('/contact', function(req, res) {
        res.sendfile('./web/views/contact.html');
    });

    app.get('/cookies', function(req, res) {
        res.sendfile('./web/views/cookies.html');
    });

    app.get('/privacy', function(req, res) {
        res.sendfile('./web/views/privacy.html');
    });

    app.get('/terms', function(req, res) {
        res.sendfile('./web/views/terms.html');
    });

};
