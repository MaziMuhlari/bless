module.exports = function() {
    
    var email = {
        conversation: {
            message: {
                sent: function(conversationId, recepientEmail, senderName, senderSurname, message) {
                    sendgrid.send({
                            to:       recepient["username"],
                            from:     'blesserco@icloud.com',
                            subject:  'Message from ' + sender["name"] + " " + sender["surname"],
                            html:     sender["name"] + " " + sender["surname"] + ': ' + req.query.message + ' <a href="http://blesser.co/messages/' + req.query.conversation_id + '">reply here</a>'
                    }, function(err, json) {
                            if (err) { 
                                return console.error(err); 
                            } else {
                                console.log(json);
                            }
                    });
                }
            }
        }
    }
    
};