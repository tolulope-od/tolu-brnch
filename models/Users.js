const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    enum: ['customer', 'agent']
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

module.exports = models.users || model('users', userSchema);