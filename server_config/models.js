let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

/**
 * Mongoose Model object representing a single chat [users]
 */

var user_id= { type: String, required: true }

var message_schema = new mongoose.Schema({

  from   : { type: String, required: true },
  to     : { type: String, required: true },

  message: { type: String, required: true },
});

var chat_schema = new mongoose.Schema({

  users   :  [user_id],
  // community generated data
  messages:  [ message_schema ]
});

var ChatModel = mongoose.model('chats', chat_schema);

module.exports = { 
    ChatModel
};