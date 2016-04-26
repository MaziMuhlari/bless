var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		return next();
  }
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/get-blessed');
}

module.exports = function(app, passport) {

  /**
   * API
   */

	app.post('/register', passport.authenticate('register', {
		successRedirect: '/',
		failureRedirect: '/get-blessed',
		failureFlash : false
	}));

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/get-blessed',
		failureFlash : false
	}));

  /**
   * VIEWS
   */

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

  app.get('/login', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/register', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/report', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/messages', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html', { user: req.user });
  });

  app.get('/profile', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html', { user: req.user });
  });

  app.get('/page-not-found', function(req, res) {
      res.sendfile('./web/views/index.html', { user: req.user });
  });

  app.get('*', function(req, res) {
    if(res.status(404)){
      res.redirect('/page-not-found');
    }
  });

};
