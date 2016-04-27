var mongoose = require('mongoose');
var User            = require('../models/user');
var Message         = require('../models/message');
var Conversation         = require('../models/conversation');

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
		failureFlash : true
	}));

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	}));

	app.get('/log-out', function(req, res) {
		req.logout();
		res.clearCookie('_id');
		res.clearCookie('username');
		res.clearCookie('gender');
		res.clearCookie('is_active');
		res.clearCookie('name');
		res.clearCookie('surname');
		res.clearCookie('description');
		res.clearCookie('is_blesser');
		res.clearCookie('blessing');
		res.clearCookie('created_on');
		res.clearCookie('logged_in');
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

	app.post('/api/user/:id', isAuthenticated, function(req, res) {
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

	app.get('/api/user/blessers', function(req, res) {
    User
		.find({ is_blesser: true }, { password: 0, username: 0 })
		.sort({created_on: 'asc'})
		.limit(req.query.take)
		.skip(req.query.skip)
		.exec(function(err, data){
			if(err){
					res.json(err);
			}else{
					res.json(data);
			}
		});
  });

	// security

	app.get('/api/security/loggin-in', function(req, res) {
		if (req.user) {
			res.json(true);
		} else {
			res.json(false);
		}
  });

	// Conversation

	app.post('/api/conversation', isAuthenticated, function(req, res){
		Conversation.findOne({
			$and: [
				{ 'recepients': mongoose.Types.ObjectId(req.query.creator) },
				{ 'recepients': mongoose.Types.ObjectId(req.query.recepient) }
			]
		})
		.populate("recepients")
		.exec(function(err, conversation){
		    if (err){
	        res.send(err);
				} else if(conversation){
					var arr = [];
					arr.push(mongoose.Types.ObjectId(req.query.creator));
					Array.prototype.push.apply(conversation.read, arr);
          conversation.save(function (err){
              if(err){
                  res.send(err);
              }else{
								for (var x = 0; x < conversation.recepients.length; x++) {
									conversation.recepients[x].username = "";
									conversation.recepients[x].password = "";
								}
                res.json(conversation);
              }
          });
				}else{
					var recepients = [];
					recepients.push(req.query.creator);
					recepients.push(req.query.recepient);
					Conversation.create({
						creator: req.query.creator,
						recepients: recepients
					}, function(err, conversation){
					    if (err){
				        res.send(err);
							} else {
								Conversation.findOne({
									$and: [
										{ 'recepients': mongoose.Types.ObjectId(req.query.creator) },
										{ 'recepients': mongoose.Types.ObjectId(req.query.recepient) }
									]
								})
								.populate("recepients")
								.exec(function(err, conversation){
									if (err){
						        res.send(err);
									} else {
										for (var x = 0; x < conversation.recepients.length; x++) {
											conversation.recepients[x].username = "";
											conversation.recepients[x].password = "";
										}
										res.json(conversation);
									}
								});
							}
					});
				}
		});
  });

	app.get('/api/conversations', isAuthenticated, function(req, res){
		Conversation.find({
			 recepients: mongoose.Types.ObjectId(req.query.user_id)
		})
		.populate("recepients")
		.sort({last_message_sent: 'desc'})
		.exec(function(err, conversations){
		    if (err){
	        res.send(err);
				} else {
					for (var i = 0; i < conversations.length; i++) {
						for (var x = 0; x < conversations[i].recepients.length; x++) {
							conversations[i].recepients[x].username = "";
							conversations[i].recepients[x].password = "";
						}
					}
					res.json(conversations);
				}
		});
  });

	app.get('/api/conversations/unread', isAuthenticated, function(req, res){
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	  res.header('Expires', '-1');
	  res.header('Pragma', 'no-cache');
		Conversation.count({
			 recepients: mongoose.Types.ObjectId(req.query.user_id),
			 read: { '$ne': mongoose.Types.ObjectId(req.query.user_id) }
		}, function(err, conversations){
		    if (err){
	        res.send(err);
				} else {
					res.json(conversations);
				}
		});
  });

	// Message

	app.get('/api/messages', isAuthenticated, function(req, res){
		Message.find({
			conversation: req.query.conversation_id
		}, function(err, messages){
		    if (err){
	        res.send(err);
				} else {
					res.json(messages);
				}
		});
  });


	app.post('/api/message/send', isAuthenticated, function(req, res){
		Message.create({
			message: req.query.message,
			conversation: req.query.conversation_id,
			composer: req.query.composer,
		}, function(err, message){
		    if (err){
	        res.send(err);
				} else {
					var arr = [];
					arr.push(mongoose.Types.ObjectId(req.query.composer));
					Conversation.update({
						_id: req.query.conversation_id
					}, {
						$set : {
							last_message_excerpt: req.query.message,
							read: arr,
					    last_message_sent: new Date()
						}
					}).exec();

					res.json(message);

				}
		});
  });

  /**
   * VIEWS
   */

  app.get('/', function(req, res) {
		if (req.user) {
			res.cookie('_id', req.user._id, { maxAge: 2592000000 });
			res.cookie('username', req.user.username, { maxAge: 2592000000 });
			res.cookie('gender', req.user.gender, { maxAge: 2592000000 });
			res.cookie('is_active', req.user.is_active, { maxAge: 2592000000 });
			res.cookie('name', req.user.name, { maxAge: 2592000000 });
			res.cookie('surname', req.user.surname, { maxAge: 2592000000 });
			res.cookie('description', req.user.description, { maxAge: 2592000000 });
			res.cookie('is_blesser', req.user.is_blesser, { maxAge: 2592000000 });
			res.cookie('blessing', req.user.blessing, { maxAge: 2592000000 });
			res.cookie('created_on', req.user.created_on, { maxAge: 2592000000 });
			res.cookie('logged_in', true, { maxAge: 2592000000 });
    } else {
			res.clearCookie('_id');
			res.clearCookie('username');
			res.clearCookie('gender');
			res.clearCookie('is_active');
			res.clearCookie('name');
			res.clearCookie('surname');
			res.clearCookie('description');
			res.clearCookie('is_blesser');
			res.clearCookie('blessing');
			res.clearCookie('created_on');
			res.clearCookie('logged_in');
    }
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
      res.render('login', { messages: req.flash('message') });
  });

  app.get('/register', function(req, res) {
      res.render('register', { messages: req.flash('message') });
  });

  app.get('/report', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/logged-out', function(req, res) {
		res.clearCookie('_id');
		res.clearCookie('username');
		res.clearCookie('gender');
		res.clearCookie('is_active');
		res.clearCookie('name');
		res.clearCookie('surname');
		res.clearCookie('description');
		res.clearCookie('is_blesser');
		res.clearCookie('blessing');
		res.clearCookie('created_on');
		res.clearCookie('logged_in');
    res.sendfile('./web/views/index.html');
  });

  app.get('/messages', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html');
  });

	app.get('/messages/:id', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/profile', isAuthenticated, function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('/page-not-found', function(req, res) {
      res.sendfile('./web/views/index.html');
  });

  app.get('*', function(req, res) {
    if(res.status(404)){
      res.redirect('/page-not-found');
    }
  });

};
