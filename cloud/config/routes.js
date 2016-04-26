var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/about', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/privacy', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/terms', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/cookies', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/contact', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/join', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/report', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('*', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html', { user: req.user });
  });
};
