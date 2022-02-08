import { Schema, model } from 'mongoose';

const roomsSchema = new Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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

const Rooms = model('rooms', roomsSchema);

export default Rooms;