import mongoose from "mongoose"
import connectToDB from "../../../../lib/connectToDb";
import Messages from "../../../../models/Messages";
import getUser from "../../../../lib/getUser";
import serverResponse from "../../../../lib/serverResponse";

export default async (req, res) => {
  await connectToDB();
  try {
    switch (req.method) {
      case 'GET':
        if (!req.headers.userid) {
          serverResponse.failedRequest(
            res, 400, 'Invalid request, no user ID'
          );
          break;
        }
        const user = await getUser(req.headers.userid);
        const messages = await Messages.find({
          ...(user.userType === 'customer' ? { senderId: user._id } : {})
        }).populate({
          path: 'senderId'
        })
        res.status(200).json({
          status: 'success',
          message: 'Messages fetched successfully',
          data: messages,
        });
        break;
      case 'POST':
        const id = mongoose.Types.ObjectId();
        const newMessage = await Messages.create({
          _id: id,
          messageBody: req.body.messageBody,
          senderId: req.body.senderId,
          roomId: req.body.roomId,
          status: 'sent',
          timestamp: new Date(Date.now()),
        });
        await newMessage.save();
        const message = await Messages.findOne({
          _id: id,
        }).populate({
          path: 'senderId',
        })
        serverResponse.successfulRequest(res, 201, 'Message sent successfully!', {
          ...message._doc,
        });
        break;
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
      error,
    })
  }
}