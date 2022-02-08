import connectToDB from "../../../../lib/connectToDb";
import Messages from "../../../../models/Messages";
import getUser from "../../../../lib/getUser";
import serverResponse from "../../../../lib/serverResponse";

export default async (req, res) => {
  await connectToDB();
  try {
    switch (req.method) {
      case 'GET':
        // console.log(req);
        const { roomId } = req.query;
        const messages = await Messages.find({
          roomId,
        }).populate({
          path: 'senderId'
        }).populate({
          path: 'assignedTo',
        });

        if (!messages) {
          serverResponse.failedRequest(res, 404, 'No messages found!');
          break;
        }
        serverResponse.successfulRequest(res, 200, 'Messages fetched successfully', messages);
        break;
    }
  } catch (error) {
    return serverResponse.serverFailure(res, error);
  }
}