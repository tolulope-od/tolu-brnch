const { Schema, model, models } = require('mongoose');

const messagesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  messageBody: {
    type: String,
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'messages',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['read', 'unread', 'delivered', 'sent'],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  deletedOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = models.messages || model('messages', messagesSchema);