// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const users = [{
    id: 'id',
    firstName: 'user',
    lastName: 'name',
    username: 'username',
    password: 'salt',
    email: 'user@email.com',
    userType: 'user|agent',
    createdOn: 'timestamp',
    deletedOn: 'timestamp',
    updatedOn: 'timestamp'
  }];

  const messages = [{
    id: 'id',
    messageBody: 'body of message',
    messageId: 'id of another message thread',
    timestamp: 'messagetimestamp',
    userId: users[0].id,
    roomId: 'uuid',
    status: 'read|unread|delivered|sent',
  }];
  res.status(200).json({ name: 'John Doe' })
}
