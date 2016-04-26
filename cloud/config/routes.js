var User            = require('../models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		return next();
  }
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(app, passport) {

  /**
   * API
   */

	app.post('/register', passport.authenticate('register', {
		successRedirect: '/',
		failureRedirect: '/register',
		failureFlash : false
	}));

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : false
	}));

	app.get('/log-out', function(req, res) {
		req.logout();
		res.redirect('/logged-out');
	});

  app.get('/api/user', isAuthenticated, function(req, res){
    var user = {};
    if (req.user) {
      user = {
        _id: req.user._id,
				username: req.user.username,
		    gender: req.user.gender,
		    is_active: req.user.is_active,
		    name: req.user.name,
		    surname: req.user.surname,
		    description: req.user.description,
		    is_blesser: req.user.is_blesser,
		    blessing: req.user.blessing,
		    created_on: req.user.created_on,
				logged_in: true
      };
    } else {
      user = {
        logged_in: false
      };
    }
    res.json(user);
  });

	app.post('/api/user/:id', function(req, res) {
    User.findOne({
        _id: req.params.id
    }, function(err, data){
      data.name = req.body.name;
	    data.gender = req.body.gender;
      data.surname = req.body.surname;
      data.description = req.body.description;
			data.is_blesser = req.body.is_blesser;
      data.blessing = req.body.blessing;
      data.save(function (err){
          if(err){
              res.send("Error: " + err);
          }else{
              res.json(data);
          }
      })
    });
  });

	app.post('/api/user/profile', isAuthenticated, function(req, res){
    var user = {};
    if (req.user) {
      user = {
        _id: req.user._id,
        created_on: req.user.created_on,
        active: req.user.active,
        gender: req.user.gender,
        username: req.user.username,
        logged_in: true
      };
    } else {
      user = {
        logged_in: false
      };
    }
    res.json(user);
  });

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

  app.get('/logged-out', function(req, res) {
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
