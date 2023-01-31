var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
messageId: {
type: String,
required: true,
unique: true
},
messageType: {
type: String,
required: true
},
textOrPathToFile: {
type: String,
required: true
},
roomId: {
type: String,
required: true
},
userId: {
type: String,
required: true
},
userName: {
type: String,
required: true
},
// timestamps: true
timestamps: { createdAt: Date, updatedAt: Date }
});

module.exports = mongoose.model('Message', messageSchema);
