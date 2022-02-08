import connectToDB from "../../../lib/connectToDb";
import serverResponse from "../../../lib/serverResponse";
import Users from "../../../models/Users";

export default async (req, res) => {
  await connectToDB();
  try {
    switch (req.method) {
      case 'POST':
        const { username, password } = req.body;

        const foundUser = await Users.findOne({
          username,
          password,
        });

        if (!foundUser) {
          return serverResponse.failedRequest(
            res,
            404,
            'User not found',
          )
        }

        return serverResponse.successfulRequest(res, 200, 'User logged in successfully', {
          ...foundUser._doc,
        });
    }
  } catch (error) {
    return serverResponse.serverFailure(res, error);
  }
}