const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  messageId: { type: String, required: true },
  messageText: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
