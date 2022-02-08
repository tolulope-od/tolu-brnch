import connectToDB from "../../../../lib/connectToDb";
import serverResponse from "../../../../lib/serverResponse";
import Messages from "../../../../models/Messages";

export default async function (req, res) {
  await connectToDB();
  try {
    switch (req.method) {
      case 'POST':
        const { messageId } = req.query;
        const { userId } = req.body;

        // grab the message
        const message = await Messages.findOne({
          _id: messageId,
        });

        if (!message) {
          return serverResponse.failedRequest(res, 404, 'Message does not exist');
        }

        const newMessage = await Messages.findOneAndUpdate(
          { _id: messageId },
          { $set: { assignedTo: userId } },
          { new: true },
        );

        return serverResponse.successfulRequest(res, 200, 'Message assigned successfully', { ...newMessage });
    }
  } catch (error) {
    return serverResponse.serverFailure(res, error);
  }
}