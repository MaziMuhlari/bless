// Models

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendfile('./web/views/index.html');
    });

    app.get('/messages', function(req, res) {
        res.sendfile('./web/views/messages.html');
    });

};
