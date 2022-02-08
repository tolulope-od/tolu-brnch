const mongoose = require('mongoose');

let cached = global.mongoose;
const connected = {};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(`Mongoose connection error occurred: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database connection terminated');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnecting due to interruption event');
    process.exit(0);
  });
});

async function connectToDB() {
  try {
    // if (global.__MONGOOSE_DB_CONNECTION) {
    //   console.log('using cached connection!')
    //   return global.__MONGOOSE_DB_CONNECTION
    // }
    if (connected.isConnected) {
      return;
    }

    // if (!global.__MONGOOSE_DB_CONNECTION) {
    //   console.log('creating new connection');
    //   const opts = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     bufferCommands: false,
    //   }

    //   global.__MONGOOSE_DB_CONNECTION = mongoose.connect('mongodb://localhost:27017/branch-chat', opts).then(mongoose => {
    //     return mongoose
    //   })
  
    //   cached.promise = mongoose.connect('mongodb://localhost:27017/branch-chat', opts).then(mongoose => {
    //     return mongoose
    //   })
    // }
    const db = await mongoose.connect('mongodb://localhost:27017/branch-chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected.isConnected = db.connections[0].readyState
    console.log('Database connection established');
    // return cached.conn;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = connectToDB;