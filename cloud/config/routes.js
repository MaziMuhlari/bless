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

};
