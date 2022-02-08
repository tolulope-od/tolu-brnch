const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Messages = require('../models/Messages');
const Users = require('../models/Users');
const connectToDB = require('../lib/connectToDb');

connectToDB();

const userObjectIds = {};

const messages = [];

fs
  .createReadStream(`${__dirname}/../data/messages.csv`)
  .pipe(csv())
  .on('data', async function (row) {
    messages.push(row);
  })
  .on('end', async function () {
    const uniqueUsers = messages.reduce((accumulator, user, index) => {
      if (!accumulator[user['User ID']]) {
        const id = mongoose.Types.ObjectId();
        accumulator[user['User ID']] = id;
      }
      return accumulator;
    }, {});
    console.log([uniqueUsers], ['unique']);
    Object.keys(uniqueUsers).map(async (user, index) => {
      await Users.create({
        _id: uniqueUsers[user],
        firstName: `Firstname ${index}`,
        lastName: `Lastname ${index}`,
        username: `user-${user}`,
        password: `Testing-${index}`,
        email: `${user}@branch.com`,
        userType: 'customer',
      })
    });

    messages.map(async (user, index) => {
      const id = mongoose.Types.ObjectId();
      await Messages.create({
        _id: id,
        senderId: uniqueUsers[user['User ID']],
        timestamp: new Date(user['Timestamp (UTC)']),
        messageBody: user['Message Body'],
        roomId: `customer-${uniqueUsers[user['User ID']]}-agent`,
        status: 'delivered',
      });
    });
    const id = mongoose.Types.ObjectId();
    await Users.create({
      "firstName": "Agent",
      "lastName": "Lastname 47",
      "username": "agent-47",
      "password": "Testing-47",
      "email": "47@branch.com",
      "userType": "agent",
      _id: id,
    });

    process.exit(0)
  })