import Users from "../models/Users";

const getUser = async (id) => {
  try {
    const user = await Users.findOne({
      _id: id,
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export default getUser;
