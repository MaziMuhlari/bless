var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');
var bCrypt          = require('bcrypt-nodejs');
var sendgrid       	= require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = function(passport){

	passport.use('register', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in Registration: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+ username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that username
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
												newUser.gender = req.param('gender');
                        newUser.coupon = req.param('coupon');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');

                            sendgrid.send({
                                to:       username,
                                from:     'blesserco@icloud.com',
                                subject:  'Blesser Registration Succesful',
                                text:     'Congratulations on your registration to blesser.co. ' + username + '. You can click the follwing link to start using the site https://www.blesser.co'
                            }, function(err, json) {
                                if (err) { return console.error(err); }
                                console.log(json);
                            });

                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
